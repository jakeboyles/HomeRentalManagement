<nav class="container-fluid navbar">
	<div class="row">
		<div class="container">

		    <div class="col-md-3">
		        <a class="logo" href="/"><img src="{{ asset('images/logo.png') }}"></a>
		    </div>

		    <div class="collapse navbar-collapse col-md-8 pull-right" id="bs-example-navbar-collapse-1">
		        <ul class="nav navbar-nav navbar-right">

		                <li class="{{ (Request::is('auth/login') ? 'active' : '') }}">
		                <a href="#homeFeatures"> Details</a>
		                </li>

		                <li class="{{ (Request::is('auth/register') ? 'active' : '') }}">
		                <a href="#homeImages">Images</a>
		                </li>

		                <li class="{{ (Request::is('auth/register') ? 'active' : '') }}">
		                <a href="#homeCalendar"><i class="fa fa-calendar"></i> Availability</a>
		                </li>
		        </ul>
		    </div>
	    </div>
    </div>
</nav>