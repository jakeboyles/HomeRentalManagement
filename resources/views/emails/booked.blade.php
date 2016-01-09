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

<p>We have you checking in on: {{$booking->check_in}}. Check in is at 3pm. Your checkout date is: {{$booking->check_out}}, and you need to checked out by 11am.</p>

<p>If you have any questions please call us at: 1-888-888-8888.</p>

<p>Thank You!</p>

</div>

@endsection