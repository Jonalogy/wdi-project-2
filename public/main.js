$('document').ready(function(){
  $.get("/allTheBrands", function(allBrands) {
    for(var i=0; i<allBrands.length; i++) {
      $('#brandMenu').append('<a class="dropdown-item" href="/product/'+ allBrands[i].brandName + '">'+allBrands[i].brandName+'</a>');
    }
  });

  $('#registerform').on('focusout', '.form-control', validate);  //Trigger form validation with completion of each input
  $('#registerform').on('click', '#register', register);
});

$('document').ready(function(){
  $('#signinform').on('focusout', '.form-control', validate);  //Trigger form validation with completion of each input
  $('#signinform').on('click', '#signin', signin);
});

$('document').ready(function(){
  var granimInstance = new Granim({
      element: '#granim-canvas',
      direction: 'left-right',
      opacity: [1, 1],
      states : {
          "default-state": {
              gradients: [
                  ['#FE4365', '#EE3355'],
                  ['#FC9D9A', '#EE8888'],
                  ['#F9CDAD', '#EEBB99'],
                  ['#C8C8A9', '#BBBB99'],
                  ['#83AF9B', '#779988'],
                  ['#C17980', '#BB6677']
              ],
              transitionSpeed: 4000
          }
      }
  });
  //
  // var granimInstance = new Granim({
  //     element: '#background-canvas',
  //     direction: 'left-right',
  //     opacity: [1, 1],
  //     states : {
  //         "default-state": {
  //             gradients: [
  //                 ['#FFFFFF', '#FFFBFB'],
  //                 ['#FFFBFB', '#FDFDFB'],
  //                 ['#FDFDFB', '#FFFFFF'],
  //                 ['#FFFFFF', '#FFFBFB'],
  //                 ['#FFFBFB', '#FDFDFB'],
  //                 ['#FDFDFB', '#FFFFFF']
  //             ],
  //             transitionSpeed: 4000
  //         }
  //     }
  // });
});




function register() {
  if(validate('submitRegistration')) {
    $('#registerform').submit();
    event.preventDefault();
  }
  else {
    console.log("FAIL");
  }
}

function signin() {
  if(validate('signin')) {
    $('#signinform').submit();
    event.preventDefault();
  }
}

//FORM VALIDATION///////////////////////////////////////////////////////////////
function validate(type) {
  if(this.name=='name') {
    if(!validateName(this.value)) {
      $(this).parent().removeClass('has-success').addClass('has-danger');
      $(this).parent().find('.form-control').removeClass('form-control-success').addClass('form-control-danger');
      $(this).parent().find('.form-control-feedback').text('needs at least 1 character');
    }
    else {
      $(this).parent().removeClass('has-danger').addClass('has-success');
      $(this).parent().find('.form-control').removeClass('form-control-danger').addClass('form-control-success');
      $(this).parent().find('.form-control-feedback').text('');
    }
  }

  if(this.name=='email') {
    if(!validateEmail(this.value)) {
      $(this).parent().removeClass('has-success').addClass('has-danger');
      $(this).parent().find('.form-control').removeClass('form-control-success').addClass('form-control-danger');
      $(this).parent().find('.form-control-feedback').text('has to be valid');
    }
    else {
      $(this).parent().removeClass('has-danger').addClass('has-success');
      $(this).parent().find('.form-control').removeClass('form-control-danger').addClass('form-control-success');
      $(this).parent().find('.form-control-feedback').text('');
    }
  }

  if(this.name=='password') {
    if(!validatePassword(this.value)) {
      $(this).parent().removeClass('has-success').addClass('has-danger');
      $(this).parent().find('.form-control').removeClass('form-control-success').addClass('form-control-danger');
      $(this).parent().find('.form-control-feedback').text('needs at least 8 characters');
    }
    else {
      $(this).parent().removeClass('has-danger').addClass('has-success');
      $(this).parent().find('.form-control').removeClass('form-control-danger').addClass('form-control-success');
      $(this).parent().find('.form-control-feedback').text('');
      if($(this).parent().parent().find('#password2')[0].value!='' && this.value!=$(this).parent().parent().find('#password2')[0].value) {
        $(this).parent().parent().find('#password2').parent().removeClass('has-success').addClass('has-danger');
        $(this).parent().parent().find('#password2').parent().removeClass('form-control-success').addClass('form-control-danger');
        $(this).parent().parent().find('#password2').parent().find('.form-control-feedback').text('does not match');
      }
      else {
        $(this).parent().parent().find('#password2').parent().removeClass('has-danger').addClass('has-success');
        $(this).parent().parent().find('#password2').parent().removeClass('form-control-danger').addClass('form-control-success');
        $(this).parent().parent().find('#password2').parent().find('.form-control-feedback').text('');
      }
    }
  }

  if(this.name=='password2') {
    if(this.value!=$(this).parent().parent().find('#password')[0].value) {
      $(this).parent().removeClass('has-success').addClass('has-danger');
      $(this).parent().find('.form-control').removeClass('form-control-success').addClass('form-control-danger');
      $(this).parent().find('.form-control-feedback').text('needs to match');
    }
    else {
      $(this).parent().removeClass('has-danger').addClass('has-success');
      $(this).parent().find('.form-control').removeClass('form-control-danger').addClass('form-control-success');
      $(this).parent().find('.form-control-feedback').text('');
    }
  }


  if(type=='submitRegistration') {
    if(validateEmail($('#registerform').find('#email').val()) && validatePassword($('#registerform').find('#password').val()) && $('#registerform').find('#password').val()==$('#registerform').find('#password2').val()) {
      return true;
    }
    else {
      return false;
    }
  }


  if(this.name=='email') {
    if(!validateEmail(this.value)) {
      $(this).parent().removeClass('has-success').addClass('has-danger');
      $(this).parent().find('.form-control').removeClass('form-control-success').addClass('form-control-danger');
      $(this).parent().find('form-control-feedback').text('has to be valid');
    }
    else {
      $(this).parent().removeClass('has-danger').addClass('has-success');
      $(this).parent().find('.form-control').removeClass('form-control-danger').addClass('form-control-success');
      $(this).parent().find('form-control-feedback').text('');
    }
  }

  if(type=='signin') {
    return (validateEmail($('#signinform').find('#email').val()));
  }



  function validateEmail(userInput) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(userInput);
  }

  function validatePassword(userInput) {
    if(userInput.length < 8) return false;
    else return true;
  }

  function validateName(userInput) {
    if(userInput.length < 1) return false;
    else return true;
  }

}
