/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production');
}

$(document).ready(function() {
  if (GOVUK.cookie('reviewed')) {
    $('.js-send-for-review-clicked').show();
    $('.js-send-for-review-not-clicked').hide();
  } else {
    $('.js-send-for-review-clicked').hide();
    $('.js-send-for-review-not-clicked').show();
  }

  $('.js-review-passed').on('click', function(event) {
    event.preventDefault();
    GOVUK.cookie('reviewed', true, { days: 30 });
    $(this).hide();
    $('.js-send-for-review-clicked').show();
    $('.js-send-for-review-not-clicked').hide();
  });

  $('.js-clone-director').on('click', function(event) {
    event.preventDefault();
    $('.js-director-markup')
      .clone()
      .insertAfter('.js-director-markup')
      .removeClass('js-director-markup');

    // var $clone = $('.js-director-markup:last').clone();
    // $clone.find('input');
  });
});

// $clone = $('.item-name:last').clone();
// for (i = 1; i < 999; i++) {
//   if (
//     $('.item-name select[id=id_form-' + i + '-name]').attr('id') !=
//     'id_form-' + i + '-name'
//   ) {
//     $clone.find('select').attr('id', 'id_form-' + i + '-name');
//     $clone.find('select').attr('name', 'form-' + i + '-name');
//     $clone.find('label').attr('for', 'id_form-' + i + '-name');
//     break;
//   }
// }
// $clone.insertAfter('.item-name:last');
