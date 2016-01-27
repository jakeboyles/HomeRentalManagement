<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Date;
use Storage;
use File;
use Auth;
use Stripe;
use Redirect;
use DB;
use App\Booking;
use Mail;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class HomeController extends Controller {

	/*
	|--------------------------------------------------------------------------
	| Home Controller
	|--------------------------------------------------------------------------
	|
	| This controller renders your application's "dashboard" for users that
	| are authenticated. Of course, you are free to change or remove the
	| controller as you wish. It is just here to get your app started!
	|
	*/

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		//$this->middleware('auth');

		//parent::__construct();

		//$this->news = $news;
		//$this->user = $user;
	}


	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function index()
	{

		$bookings = Date::all();

		$home = DB::table('home_page')->first();

		$photos = DB::table('media')->get();

		return view('pages.home',array("Bookings"=>$bookings,'content'=>$home,'photos'=>$photos));
	}


	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function thankYou()
	{

		return view('pages.thankYou');
	}


	public function admin()
	{
		$photos = DB::table('media')->get();
		$home = DB::table('home_page')->first();
		return view('pages.admin',array("content"=>$home,"photos"=>$photos));
	}

	public function bookCalendar(Request $request)
	{

		$curYir = date("Y");//current year
		$MDay = date('Y-m-d', strtotime("may $curYir first monday")); // memorial day
		$LDay = date('Y-m-d', strtotime("september $curYir first monday"));  //labor day

		$checkIn = $request['reservation_data'][0]['check_in'];
		$checkOut = $request['reservation_data'][0]['check_out'];


		if (($checkIn > $MDay) && ($checkIn < $LDay) && ($checkOut > $MDay) && ($checkOut < $LDay) )
	    {
	      if( (date('w', strtotime($checkIn)) != 6) && (date('w', strtotime($checkOut)) != 6) )
	      {
	      	return json_encode(array('failure'=>true,'message'=>'Bookings made between labor day and memorial day must be from Saturday to Saturday.'));
	      }
	    }

		$total = $request['reservation_data'][0]['price_total'];

        $charge = Stripe::charges()->create(array(
          "amount" => $total,
          "currency" => "usd",
          "source" => $request['token'], 
        ));

        if ( !$charge ) // No
        {
            return json_encode(array('success'=>false,'message'=>'Stripe charge failed.'));
        } 

		$from = $request['reservation_data'][0]['check_in'];
		$to = $request['reservation_data'][0]['check_out'];

		$dates = $this->createDateRangeArray($from,$to);

		foreach($dates as $date)
		{
			$booking = Date::firstOrCreate(array('date' => $date));

			if($booking->exists)
			{
				$booking->status = "booked";
			}
			else
			{
				$booking->date = $date;
				$booking->price = 1500;
				$booking->status = "booked";
			}

			$booking->save();

		}

		$booking = new Booking;
		$booking->first_name = $request['form'][0]['value'];
		$booking->last_name = $request['form'][1]['value'];
		$booking->email = $request['form'][2]['value'];
		$booking->phone = $request['form'][3]['value'];
		$booking->message = $request['form'][4]['value'];
		$booking->check_in = $request['reservation_data'][0]['check_in'];
		$booking->check_out = $request['reservation_data'][0]['check_out'];
		$booking->stripe_id = $charge['id'];
		$booking->save();


		Mail::send('emails.booked', ['booking' => $booking], function ($m) use ($booking,$request) {
            $m->from('admin@grandisonhouse.com', 'Grandison House');

            $m->to($request['form'][2]['value'], $request['form'][0]['value'])->subject('Your Booking!');
        });

        Mail::send('emails.newbooking', ['booking' => $booking], function ($m) use ($booking,$request) {
            $m->from('admin@grandisonhouse.com', 'Grandison House');

            $m->to('shelli.grandison@aol.com', 'Shelli Grandison')->subject('Your Booking!');
            $m->bcc('jake@jibdesigns.com', 'Jake Boyles');
        });

		return json_encode(array('success'=>true));
	}


	public function saveCalendar(Request $request)
	{

		Date::truncate();

		$dates = json_decode($request->dopbcp_schedule);

		foreach($dates as $date => $book)
		{
			$booking = new Date();
			$booking->date = $date;
			$booking->price = $book->price;
			$booking->status = $book->status;
			$booking->save();
		}

		return json_encode(array('success'=>true));
	}


	public function calendar()
	{

		$days = array();

		$bookings = Date::all();

		$count = 0;

		foreach($bookings as $booking)
		{

			$day = array(
			  	 'bind' => 0,
			     'price' => $booking->price,
			     'status' => $booking->status,
			  );

			$count++;

			$days[$booking->date] = $day;
		}

		return json_encode($days);
	}


	private function createDateRangeArray($strDateFrom,$strDateTo)
{
    // takes two dates formatted as YYYY-MM-DD and creates an
    // inclusive array of the dates between the from and to dates.

    // could test validity of dates here but I'm already doing
    // that in the main script

    $aryRange=array();

    $iDateFrom=mktime(1,0,0,substr($strDateFrom,5,2),     substr($strDateFrom,8,2),substr($strDateFrom,0,4));
    $iDateTo=mktime(1,0,0,substr($strDateTo,5,2),     substr($strDateTo,8,2),substr($strDateTo,0,4));

    if ($iDateTo>=$iDateFrom)
    {
        array_push($aryRange,date('Y-m-d',$iDateFrom)); // first entry
        while ($iDateFrom<$iDateTo)
        {
            $iDateFrom+=86400; // add 24 hours
            array_push($aryRange,date('Y-m-d',$iDateFrom));
        }
    }
    return $aryRange;
}

}