$( document ).ready(function() {

	tinymce.init({ selector:'textarea', height: 350 });

	$('.bxslider').bxSlider({
	  minSlides: 2,
	  maxSlides: 3,
	  slideWidth: 400,
	  slideMargin: 10
	});


	$('#myTabs a').click(function (e) {
	  e.preventDefault();
	  $(this).tab('show');
	});


	$('#backend').DOPBackendBookingCalendarPRO({
	'loadURL': '/calendar',
	'saveURL': '/calendar/save'
	});


	$(".delete-button").on("click",function(){
		var id = $(this).data('id');

		var data = {
			id:id,
		}

		$.ajax({
			url: "/photos/delete",
			data:data,
			type:"POST",
			success: function(result){

        	var result = JSON.parse(result);

        	if(result.success)
        	{
        		 location.reload(); 
        	}

    	}});
	})

});