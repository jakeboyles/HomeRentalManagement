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


<script src="https://cdn.jotfor.ms/static/prototype.forms.js" type="text/javascript"></script>
<script src="https://cdn.jotfor.ms/static/jotform.forms.js?3.3.10864" type="text/javascript"></script>
<script type="text/javascript"> JotForm.init(function(){ setTimeout(function() { $('input_3').hint('ex: myname@example.com'); }, 20); JotForm.clearFieldOnHide="disable"; JotForm.onSubmissionError="jumpToSubmit"; });
</script>
<link href="https://cdn.jotfor.ms/static/formCss.css?3.3.10864" rel="stylesheet" type="text/css" />
<link type="text/css" rel="stylesheet" href="https://cdn.jotfor.ms/css/styles/nova.css?3.3.10864" />
<link type="text/css" media="print" rel="stylesheet" href="https://cdn.jotfor.ms/css/printForm.css?3.3.10864" />
<style type="text/css"> .form-label-left{ width:150px !important; } .form-line{ padding-top:12px; padding-bottom:12px; } .form-label-right{ width:150px !important; } .form-all{ width:690px; color:#555 !important; font-family:"Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Verdana, sans-serif; font-size:14px; } .form-radio-item label, .form-checkbox-item label, .form-grading-label, .form-header{ color: #555; } </style> <form class="jotform-form" action="https://submit.jotform.us/submit/60225282636150/" method="post" name="form_60225282636150" id="60225282636150" accept-charset="utf-8"> <input type="hidden" name="formID" value="60225282636150" /> <div class="form-all"> <ul class="form-section page-section"> <li class="form-line" data-type="control_fullname" id="id_1"> <label class="form-label form-label-left form-label-auto" id="label_1" for="input_1"> Full Name </label> <div id="cid_1" class="form-input jf-required"> <span class="form-sub-label-container" style="vertical-align: top"> <input class="form-textbox" type="text" size="10" name="q1_fullName[first]" id="first_1" /> <label class="form-sub-label" for="first_1" id="sublabel_first" style="min-height: 13px;"> First Name </label> </span> <span class="form-sub-label-container" style="vertical-align: top"> <input class="form-textbox" type="text" size="15" name="q1_fullName[last]" id="last_1" /> <label class="form-sub-label" for="last_1" id="sublabel_last" style="min-height: 13px;"> Last Name </label> </span> </div> </li> <li class="form-line" data-type="control_email" id="id_3"> <label class="form-label form-label-left form-label-auto" id="label_3" for="input_3"> E-mail </label> <div id="cid_3" class="form-input jf-required"> <input type="email" class=" form-textbox validate[Email]" id="input_3" name="q3_email" size="30" value="" /> </div> </li> <li class="form-line" data-type="control_phone" id="id_4"> <label class="form-label form-label-left form-label-auto" id="label_4" for="input_4"> Phone Number </label> <div id="cid_4" class="form-input jf-required"> <span class="form-sub-label-container" style="vertical-align: top"> <input class="form-textbox" type="tel" name="q4_phoneNumber[area]" id="input_4_area" size="3"> <span class="phone-separate"> &nbsp;- </span> <label class="form-sub-label" for="input_4_area" id="sublabel_area" style="min-height: 13px;"> Area Code </label> </span> <span class="form-sub-label-container" style="vertical-align: top"> <input class="form-textbox" type="tel" name="q4_phoneNumber[phone]" id="input_4_phone" size="8"> <label class="form-sub-label" for="input_4_phone" id="sublabel_phone" style="min-height: 13px;"> Phone Number </label> </span> </div> </li> <li class="form-line" data-type="control_textarea" id="id_5"> <label class="form-label form-label-left form-label-auto" id="label_5" for="input_5"> How Can We Help You? </label> <div id="cid_5" class="form-input jf-required"> <textarea id="input_5" class="form-textarea" name="q5_howCan" cols="40" rows="6"></textarea> </div> </li> <li class="form-line" data-type="control_button" id="id_2"> <div id="cid_2" class="form-input-wide"> <div style="margin-left:156px" class="form-buttons-wrapper"> <button id="input_2" type="submit" class="form-submit-button"> Submit </button> </div> </div> </li> <li style="display:none"> Should be Empty: <input type="text" name="website" value="" /> </li> </ul> </div> <input type="hidden" id="simple_spc" name="simple_spc" value="60225282636150" /> <script type="text/javascript"> document.getElementById("si" + "mple" + "_spc").value = "60225282636150-60225282636150"; </script>
</form>
<script type="text/javascript">JotForm.ownerView=true;</script>



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