<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Norris Lake Home Rental, Grandison House</title>
    @section('meta_keywords')
        <meta name="keywords" content="norris,lake,home,rental"/>
    @show @section('meta_author')
        <meta name="author" content="Jake Boyles"/>
    @show @section('meta_description')
        <meta name="description"
              content="Granidson House. Premier Norris Lake Home Rental."/>
    @show
         <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
        <link href="{{ asset('css/main.css') }}" rel="stylesheet">
        <link href='http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
        <link href='https://fonts.googleapis.com/css?family=Alegreya+Sans:400,100,100italic,300,300italic,500,400italic,700,500italic,700italic,800,900,800italic,900italic' rel='stylesheet' type='text/css'>
        <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
        <script type="text/javascript" src="{{ asset('js/site.js') }}"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        <link href="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/css/select2.min.css" rel="stylesheet" />
        <script src="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/js/select2.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-maskmoney/3.0.2/jquery.maskMoney.min.js"></script>
          <script src="//cdn.tinymce.com/4/tinymce.min.js"></script>


     <link href="/js/bookings/sources/dopbcp/assets/gui/css/jquery.dop.Select.css" rel="stylesheet" />
     <link href="/js/bookings/sources/dopbcp/assets/gui/css/jquery.dop.BackendBookingCalendarPRO.css" rel="stylesheet" />
     <link href="/js/bookings/sources/dopbcp/templates/default/css/jquery.dop.FrontendBookingCalendarPRO.css" rel="stylesheet" />

     <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js"></script>
     <script type="text/javascript" src="https://js.stripe.com/v2/"></script>
     <script src="/js/bookings/sources/dopbcp/assets/js/jquery.dop.Select.js"></script>
     <script src="/js/bookings/sources/dopbcp/assets/js/dop-prototypes.js"></script>
     <script src="/js/bookings/sources/dopbcp/assets/js/jquery.dop.BackendBookingCalendarPRO.js"></script>
     <script src="/js/bookings/sources/dopbcp/assets/js/jquery.dop.FrontendBookingCalendarPRO.js"></script>

     <script src="/js/jquery.bxslider/jquery.bxslider.min.js"></script>
    <!-- bxSlider CSS file -->
    <link href="/js/jquery.bxslider/jquery.bxslider.css" rel="stylesheet" />

     <script src="/js/main.js"></script>

    @yield('styles')
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <link rel="shortcut icon" href="{{{ asset('assets/site/ico/favicon.ico') }}}">
</head>
<body>

@include('partials.nav')

@yield('content')

@include('partials.footer')


@yield('scripts')

</body>
</html>
