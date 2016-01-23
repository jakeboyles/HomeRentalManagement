@extends('welcome')
{{-- Content --}}
@section('content')

<style>
nav,.nav {
	display:none;
}

footer {
	display:none;
}
</style>
<div class="container main-container">
<br><br>
<h2>Hello, {{$booking->first_name}} {{$booking->last_name}} Your house has been booked!</h2>

<p>We have you checking in on: {{$booking->check_in}}. Check in is at 4:00pm. Your checkout date is: {{$booking->check_out}}, and you need to checked out by 11:00am.</p>

<p>If you have any questions please call us at: 423-562-8659.</p>

<p>Thank You!</p>


<h3>House Rules</h3>

<p>Thank you for renting our home, we hope you will find it as you expect it. We would appreciate you &amp; your guest cooperation in a couple of areas, that will make your stay a safe and enjoyable one. These will also help keep our home in the condition that you expect.<br>
<br>
Check In/Out: In 4:00 pm. / Out 11:00 am.
<br><br>
Trailer Parking: Please do not park boat trailers at the house, please park all trailers at the Deerfield Resort designated boat trailer area and in accordance with their guidelines.
<br><br>
Auto Parking: Deerfield Resort does not allow parking on the streets. All automobiles must be parked in the driveway. Every auto must have a Gate Pass to enter the resort.
<br><br>
Hot Tub: Showering before use will help keep the hot tub clean. Suntan lotion and sweat from the sun will make the hot tub cloudy. Outdoor showers are provided for your use. The maximum capacity is 6 people at one time. Excessive splashing or over capacity will cause the GFI breaker to shut the hot tub off. Do not set the temperature above 102 degrees. Consult your physician before use.
<br><br>
Dock: Bumpers are provided to help protect your boat. Please untie any ropes or bumpers that you may bring yourself and remove all trash daily. NO WAKE in the cove. Please be courteous to other boats tied to neighboring docks, by idling in and out of the cove, jet skis included.
Trash Removal: All trash must be TIED and in garbage bags and put in the trash bin in front of the driveway. You will be charged for trash that is not bagged. Please call 423-562-8659 when the bin becomes full, they will empty it as necessary if needed.
<br><br>
Kitchen: Please replace all kitchen items in the drawers and cabinets as illustrated.
<br><br>
Gas Grill: The grill needs to be cleaned after each use.  Please refill the tanks before leaving.
<br><br>
Locked Closets &amp; Cabinets: These are for owners use only.
<br><br>
Lower Driveway: The lower driveway is for walking only and not to be used to drive automobiles on.
<br><br>
Boat Launch: There is a community boat launch at the entrance.
<br><br>
Cleaning: Please remove your shoes indoors. Please do not rearrange any furniture. Please treat the home as your own, as it will help keep it in the condition you expect when you arrive.
<br><br>
Maintenance: In the unlikely event you need maintenance during your stay, DO NOT attempt to fix anything yourself, please call Brian Grandison (765)969-0527 on all maintenance issues.
<br><br>
At Your Own Risk: Use of anything on the premise including the house, property, hot tub, and dock are at your and your guests own risk. It is the renter’s responsibility to explain these rules to their guests and to abide by these rules. Any extra charges that may be assessed to owner along with any damage expense will be deducted from renters’ deposit.
</p>
</div>

@endsection