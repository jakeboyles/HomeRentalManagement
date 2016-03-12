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
use App\Media;
use Validator;

use App\Http\Requests;
use App\Booking;
use App\Http\Controllers\Controller;

class AdminController extends Controller {

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
	public function edit(Request $request)
	{
		
		DB::table('home_page')
            ->where('id', 1)
            ->update(['main_text' => $request->main_text, 'features'=>$request->features]);

		$home = DB::table('home_page')->first();

		$photos = DB::table('media')->get();


		return view('pages.admin',array('content'=>$home,'photos'=>$photos,'bookings'=>$bookings));
	}


	public function deletePhoto(Request $request)
	{
		DB::table('media')
            ->where('id', $request->id)
            ->delete();

        return json_encode(array('success'=>true));
	}

	public function addImage(Request $request)
	{
        $files = $request->file('file');
		foreach($files as $file) {
		  
		  	$destinationPath = 'public/images/'; // upload path
            $filename = str_random(40).'_'.$file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension(); // getting image extension
            Storage::disk('local')->put($filename,  File::get($file));

	      	$media = new Media;
			$media->location = $filename;
			$media->extension = $extension;
			$media->type = 'image';
			$media->save();
	    }

		return back()->withInput();


	}



}