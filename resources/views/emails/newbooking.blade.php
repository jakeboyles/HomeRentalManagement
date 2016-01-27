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
<h2>{{$booking->first_name}} {{$booking->last_name}} has Booked Your House!</h2>

<p>They will be checking in on: {{$booking->check_in}} and out on: {{$booking->check_out}}.</p>


<p>The payment has been proccesed and is in your stripe account!</p>


</div>

@endsection