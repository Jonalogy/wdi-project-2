
$(window).on("load", function(){

  if($(window).width()>991) {
    equalizeColumnHeights();
  }
  else {
    $('#productPictureBlock').height($('#productPictureBlock').prop('scrollHeight'));
    $('#productDescriptionBlock').height($('#productDescriptionBlock').prop('scrollHeight'));
  }
  $(window).resize(function(){
    if($(window).width()>991) {
      equalizeColumnHeights();
    }
    else {
      console.log("wefwe");
      $('#productPictureBlock').height($('#productPictureBlock').prop('scrollHeight'));
      $('#productDescriptionBlock').height($('#productDescriptionBlock').prop('scrollHeight'));
    }
  });
});

$(window).on("load", function(){
  var heights = $(".productCard").map(function (){
      return $(this).height();
  }).get(),

  maxHeight = Math.max.apply(null, heights);
  $('.productCard').height(maxHeight);
});

function equalizeColumnHeights() {
  var newHeight = Math.max($('#productPictureBlock').prop('scrollHeight'),$('#productDescriptionBlock').prop('scrollHeight'));
  $('#productPictureBlock').height(newHeight);
  $('#productDescriptionBlock').height(newHeight);
}
