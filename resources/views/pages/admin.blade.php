@extends('welcome')
{{-- Content --}}
@section('content')
<div class="container">
	<ul class="nav nav-tabs" role="tablist">
		<li role="presentation" class="active"><a href="#calendar" aria-controls="calendar" role="tab" data-toggle="tab">Calendar</a></li>
		<li role="presentation"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Content</a></li>
		<li role="presentation"><a href="#photos" aria-controls="photos" role="tab" data-toggle="tab">Photos</a></li>
	</ul>
	<div class="tab-content clearfix">
		<div role="tabpanel" class="tab-pane" id="home">
			<form class="form-horizontal" role="form" method="POST" action="{{ url('/admin/home/edit') }}">
				<input type="hidden" name="_token" value="{{ csrf_token() }}">
				<div class="description">
					<h2>Home Content</h2>
					<textarea name="main_text">{{$content->main_text}}</textarea>
				</div>
				<div class="features">
					<h2>Features</h2>
					<textarea name="features">{{$content->features}}</textarea>
				</div>
				<input type="submit" class='btn btn-primary' value="Save">
			</form>
		</div>
		<div role="tabpanel" class="tab-pane active" id="calendar">
			<div id="backend">
			</div>

			<div class="col-md-12" id="adminTableBookings">
			<h2>Current Bookings</h2>

			<table id="example" class="display" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>Name</th>
			    <th>Check-in</th>
			    <th>Check-out</th>
			    <th>Notes</th>
            </tr>
        </thead>
        <tfoot>
            <tr>
                <th>Name</th>
			    <th>Check-in</th>
			    <th>Check-out</th>
			    <th>Email</th>
			    <th>Notes</th>
            </tr>
        </tfoot>
        <tbody>
            @foreach($bookings as $booking)
			  <tr>
			    <td>{{$booking->FullName()}}</td>
			    <td>{{$booking->check_in}}</td>
			    <td>{{$booking->check_out}}</td>
			    <td>{{$booking->email}}</td>
			    <td>{{$booking->message}}</td>
			  </tr>
			   @endforeach
        </tbody>
    </table>

			</div>
		</div>
		<div role="tabpanel" class="tab-pane" id="photos">
			<div id="photos">
				<div class="allPhotos">
					<h3 class="m0">Upload Image</h3>
					<div class="col-md-12">
						<form enctype="multipart/form-data" id="upload_form" role="form" method="POST" action="/images/add" >
							<input type="hidden" name="_token" value="{{ csrf_token()}}">
							<input type="file" class="" multiple name="file[]" id="image">
							<br>
							<button type="submit" class="btn btn-primary">Add Image</button>
						</form>
					</div>
					<br><br>
					<h3>Uploaded Images</h3>
					@foreach($photos as $photo)
					<div class="col-md-3">
						<a class="delete-button" data-id="{{$photo->id}}">X</a>
						<img src="/images/{{$photo->location}}" />
					</div>
					@endforeach
				</div>
			</div>
		</div>
	</div>
</div>
@endsection

@section('scripts')
<script type="text/javascript">
$(document).ready(function(){
    $('table').DataTable();
});
</script>
@endsection