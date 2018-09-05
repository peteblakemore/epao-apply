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

  $('.js-review-passed').on('click', function() {
    GOVUK.cookie('reviewed', true, { days: 30 });
    $('.js-send-for-review-clicked').show();
    $('.js-send-for-review-not-clicked').hide();
  });
});
