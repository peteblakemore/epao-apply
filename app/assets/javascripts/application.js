/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production');
}

$(document).ready(function() {
  // add code here
  var availableTags = [
    {
      value: 'able seafarer',
      name: 'Able seafairing 101',
      requirements: [
        'Able seafairing requirement 1',
        'Able seafairing requirement 2',
        'Able seafairing requirement 3',
        'Able seafairing requirement 4'
      ]
    },
    'actor, puppeteer/marionetteer (actor/actress)',
    'actuary',
    'administrative worker',
    'advertising manager',
    'aerial rigger',
    'agricultural adviser (farming adviser)',
    'agricultural machinery mechanic (agricultural mechanic)',
    'agronomist',
    'air traffic controller',
    'air traffic safety technician',
    'aircraft instrument technician',
    'aircraft mechanic',
    'airline clerk (airline ticket agent)',
    'ammunition and explosives operative (munitions worker)',
    'animal technician',
    'animator',
    'anthropologist',
    'applications manager (computer applications manager)',
    'apprentice training officer/trainer (instructor)',
    'archeologist',
    'architect'
  ];

  $('#eligibility-standard').autocomplete({
    source: availableTags,
    select: function(event, ui) {
      // console.log({ event, ui });
      $('.js-standard-name').text(ui.item.name);
      ui.item.requirements.map(function(requirement, index) {
        $('.js-prerequisites ul').append('<li>' + requirement + '</li>');
      });
      $('.js-prerequisites').removeClass('js-hidden');
      $(this).val('');
      return false;
    }
  });
});
