$(function () {

  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
  var defaultNumber = 1400000;
  var meters = 380;

  if(localStorage.getItem('fav') === 'true') {
  	$('#heart').toggleClass('fav');
  }

  function setCurrency(number = 0) {
  	return Intl.NumberFormat('es').format(number);
  }

  $("#price-input").attr('value', localStorage.getItem('inputValue') || defaultNumber);
  $("#price-label").text(setCurrency(localStorage.getItem('inputValue') || defaultNumber));
  $("#precio-metro").text(setCurrency(
  	(localStorage.getItem('inputValue') || defaultNumber) / meters
  ));

  $("#slides1").responsiveSlides({
    auto: false,
    pagination: true,
    nav: true,
    fade: 500,
    maxwidth: 800
  });

  $('#contactar').click(() => {
  	$('#overlay').css({ display: 'flex' });
  })

  $('#enviar').click(() => {
  	if (emailRegex.test($('#email').val())) {
  		$('#validation-error').text('');
  		$('#email').css({ borderBottom: '2px solid #64b5f6' });
  		$('#overlay').css({ display: 'none' });
  	} else {
  		$('#email').css({ borderBottom: '2px solid red' });
  		$('#validation-error').text('Por favor ingrese un email válido');
  	}
  })

  $('#heart').on('click', function() {
  	$(this).toggleClass('fav');
  	localStorage.setItem('fav', !(localStorage.getItem('fav') === 'true'))
  })

  $("#price-label").on("click", function() {
	  $(this).toggle();
	  $("#price-input").toggle();
	});

  $("#price-input").on( "blur", function() {
  	var input = $(this);
	  input.toggle();
	  localStorage.setItem('inputValue', input.val())	  
	  $("#price-label").toggle();
	  $("#price-label").text(setCurrency(input.val()));
	  $("#precio-metro").text(setCurrency(
	  	input.val() / meters
	  ));
	});

});