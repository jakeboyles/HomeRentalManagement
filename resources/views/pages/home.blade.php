@extends('welcome')
{{-- Content --}}
@section('content')
<div class="container main-container">
	<div>
		<div class="home">
			<div class="row mainImages">
				<div class="col-md-6">
					<img src="/images/image1.jpg">
				</div>
				<div class="col-md-6 right">
					<img src="/images/image2.png">
					<img src="/images/image7.png">
				</div>
			</div>
		</div>
		<div id="homeFeatures" class="row homeFeatures">
			<div class="col-md-12 icons clearfix">
				<h4><i class="fa fa-home"></i> 5 Bedrooms</h4>
				<h4><i class="fa fa-male"></i> 3 Bathrooms</h4>
				<h4><i class="fa fa-bed"></i> Sleeps 14</h4>
				<h4><i class="fa fa-building"></i> 3200 sq. Feet</h4>
			</div>
			<div class="col-md-8 col-xs-12">
				<H1>Norris Lake Home Rental, Grandison House</H1>
				<?php echo htmlspecialchars_decode(stripslashes($content->main_text)); ?>
			</div>
			<div class="col-md-3 col-md-offset-1">
				<h2>Home Features</h2>
				<?php echo htmlspecialchars_decode(stripslashes($content->features)); ?>
			</div>
		</div>
	</div>
</div>
<div id="homeImages" class="images">
	<div class="container">
		<h2><i class="fa fa-home"></i> Home Images</h2>
		<ul class="bxslider">
			@foreach($photos as $photo)
			<li><img src="/images/{{$photo->location}}" /></li>
			@endforeach
		</ul>
	</div>
</div>
<div id="homeCalendar" class="container">
	<div class="calendar clearfix">
		<div id="frontend">
		</div>
	</div>
</div>

<div id="homeImages" class="images">
<div class="container">
<h2>Contact Us</h2>
<script type="text/javascript" src="https://form.jotform.com/jsform/60225282636150"></script>
</div>
</div>
<script type="text/javascript">
$('#frontend').DOPFrontendBookingCalendarPRO({
'ID': 1,
'loadURL': '/calendar',
'sendURL': '/calendar/book',
"order": {
	"data": {"redirect": "",
	"terms": false,
	"termsLink": ""},
	"text": {
"book": "Checkout",
},
},

});
</script>
@endsection