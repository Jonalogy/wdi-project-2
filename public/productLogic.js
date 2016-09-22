$('document').ready(function(){
  $('#addProductForm').on('focusout', 'input', checkFilled);
  $('#addProductForm').on('focusout', 'textarea', checkFilled);
  $('#addProductForm').on('change', 'select', checkFilled);
  $('#addProductForm').on('click', '#addProduct', addProduct);
  //GET DATA FOR AUTOCOMPLETE OF PRODUCT NAME
  $('#productName').on('focusin', function(){
    var brandName = $('#brandName').val().replace(/ /g,'-');
    var url = "/product/autocomplete/" + brandName + "/productName";
    $.ajax({
      method: "GET",
      url: url
    }).done(function(serverResponse){
      var suggestionArray = [];
      serverResponse.forEach(function(entry){
        suggestionArray.push(entry.productName);
      });
      $('#productName').autocomplete({source:suggestionArray});
    });
  });
});

function addProduct() {
  var formComplete = true;
  for(var i=0; i<$('#addProductForm')[0].length; i++) {
    if($('#addProductForm')[0][i].name == "productDescription") {
      $('#addProductForm')[0][i].value = CKEDITOR.instances.productDescription.getData();
    }
    console.log($('#addProductForm')[0][i].value);
    if(!$('#addProductForm')[0][i].value) {
      formComplete = false;
    }
  }
  if(!formComplete) {
    $('.container').find('.alert-dismissible').remove();
    $('.container').prepend('<div class="alert alert-danger alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>All fields must be completed.</div>');
  }
  else {
    $('#addProductForm').submit();
    event.preventDefault();
  }
}

//FORM VALIDATION///////////////////////////////////////////////////////////////
function checkFilled() {
  if(!$(this).val()) {
    $(this).parent().removeClass('has-success').addClass('has-danger');
    $(this).parent().find('.form-control').removeClass('form-control-success').addClass('form-control-danger');
    $(this).attr('placeholder','Field cannot be left blank');
  } else {
    $(this).parent().removeClass('has-danger').addClass('has-success');
    $(this).parent().find('.form-control').removeClass('form-control-danger').addClass('form-control-success');
  }

  if($(this).is('select') && $(this).val()=="newbrand") {
    $('#brandSection').find('#brandName').attr({id:'ignore',name:''});
    $('#brandSection').append('<div class="col-sm-3"><input type="text" class="form-control form-control-sm" name="brandName" id="brandName" placeholder="Enter brand name"></div>');
    $('#brandCountry').attr('disabled',false);
    $('#brandCountry').val('');
    $('#brandCountry').removeClass('form-control-danger').removeClass('form-control-success');
    $('#brandCountry').parent().removeClass('has-danger').removeClass('has-success');
  }
  else if($('#brandSection').find('#brandName').is('input') && $('#brandSection').find('#ignore').val()!="newbrand") {
    $('#brandSection').find('#brandName').parent().remove();
    $('#brandSection').find('#ignore').attr({id:'brandName',name:'brandName'});
  }

  if($(this).is('select') && $(this).is('#brandName')) {
    var brandName = $(this).val();
    $.ajax({
      method: "GET",
      url: "/product/brandCountry",
      data: {brandName: brandName}
    }).done(function(serverResponse){
      $('#brandCountry').val(serverResponse.brandCountry);
      $('#brandCountry').attr('disabled',true);
      $('#brandCountry').removeClass('form-control-danger').addClass('form-control-success');
      $('#brandCountry').parent().removeClass('has-danger').addClass('has-success');
    }).fail(function(){
      console.log("Retrieve data failed.");
    })
  }
}
