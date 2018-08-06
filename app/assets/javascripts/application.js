/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production');
}

$(document).ready(function() {
  $('#eligibility-standard').autocomplete({
    source: function(request, response) {
      $.getJSON('/public/javascripts/data.json', function(data) {
        var array = $.map(data, function(standard) {
          const { value, name, requirements } = standard;
          return {
            value,
            name,
            requirements
          };
        });
        // Manually filter as we're not using a server to filter resulsts
        response($.ui.autocomplete.filter(array, request.term));
      });
    },
    select: function(event, ui) {
      $('.js-standard-name').text(ui.item.name);
      $('.js-prerequisites ul').empty();
      if (ui.item.requirements) {
        ui.item.requirements.map(function(requirement, index) {
          $('.js-prerequisites ul').append('<li>' + requirement + '</li>');
        });
        $('.js-prerequisites').removeClass('js-hidden');
      } else {
        $('.js-prerequisites ul').empty();
        $('.js-prerequisites').addClass('js-hidden');
      }
      // Clear input on select.. if we do this
      // (or need to carry any other data accross) we'll need to user hidden form inputs
      // $(this).val('');
      // return false;
    }
  });
});
