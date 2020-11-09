$(function(){
	var _url = "https://my-json-server.typicode.com/KimTakBong/test_pwa_api/client";

	var dataRes = "";
	var cityRes = "<option value='all'>- Semua -</option>";
	var city = [];

	$.get(_url, function(e) {
		$.each(e, function(key, value){
			dataRes += 	
				"<div class='"+value.city+"'>"
					+"<h3>Name : "+value.name+"</h3>"
					+"<p>City : "+value.city+"</p>"
				+"</div>";

			if ($.inArray( value.city, city ) == -1 ) {
				city.push(value.city)
				cityRes += 	
					"<option "
						+"value='"+value.city+"'>"
						+value.city+
					"</option>";
			}
		})

		$("#client").html(dataRes);
		$("#city").html(cityRes);
	})

	$("#city").on("change", function(e){
		updateCity($(this).val())
	})

	function updateCity(data) {
		var dataRes = '';
		var _newUrl = _url;
		if (data != "all") {
			_newUrl = _url+"?city="+data;
		}
		$.get(_newUrl, function(e) {
			$.each(e, function(key, value){
				dataRes += 	
					"<div class='"+value.city+"'>"
						+"<h3>Nama : "+value.name+"</h3>"
						+"<p>Kota : "+value.city+"</p>"
					+"</div>";
			})

			$("#client").html(dataRes);
		})
	}
})


// PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('serviceWorker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}