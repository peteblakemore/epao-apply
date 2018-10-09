/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info("GOV.UK Prototype Kit - do not use for production");
}

$(document).ready(function() {
  $(".js-prerequisites").hide();
  $("#standard-name").autocomplete({
    source: function(request, response) {
      $.getJSON("/public/javascripts/standards.json", function(data) {
        var array = $.map(data, function(standard) {
          const { value, name, requirements } = standard;
          return {
            value,
            name,
            requirements
          };
        });
        // Manually filter as we're not using a server to filter results
        response($.ui.autocomplete.filter(array, request.term));
      });
    },
    select: function(event, ui) {
      $(".js-standard-name").text(ui.item.name);
      $(".js-prerequisites ul").empty();
      if (ui.item.requirements) {
        ui.item.requirements.map(function(requirement, index) {
          $(".js-prerequisites ul").append("<li>" + requirement + "</li>");
        });
        $(".js-prerequisites").show();
      } else {
        $(".js-prerequisites ul").empty();
        $(".js-prerequisites").hide();
      }
      // Clear input on select.. if we do this
      // (or need to carry any other data accross) we'll need to user hidden form inputs
      // $(this).val('');
      // return false;
    }
  });

  if (GOVUK.cookie("reviewed")) {
    $(".js-send-for-review-clicked").show();
    $(".js-send-for-review-not-clicked").hide();
  } else {
    $(".js-send-for-review-clicked").hide();
    $(".js-send-for-review-not-clicked").show();
  }

  $(".js-review-passed").on("click", function(event) {
    // event.preventDefault();
    GOVUK.cookie("reviewed", true, { days: 30 });
    // $(this).hide();
    $(".js-send-for-review-clicked").show();
    $(".js-send-for-review-not-clicked").hide();
  });

  $(".js-clone-director").on("click", function(event) {
    event.preventDefault();
    $(".js-director-markup")
      .clone()
      .insertAfter(".js-director-markup")
      .removeClass("js-director-markup");

    // var $clone = $('.js-director-markup:last').clone();
    // $clone.find('input');
  });
});

(function() {
  var PasswordToggler = function(element, field) {
    this.element = element;
    this.field = field;
    this.toggle();
  };

  PasswordToggler.prototype = {
    toggle: function() {
      var self = this;
      self.element.addEventListener(
        "change",
        function() {
          if (self.element.checked) {
            self.field.setAttribute("type", "text");
            self.element.labels[0].innerText = "Hide password";
          } else {
            self.field.setAttribute("type", "password");
            self.element.labels[0].innerText = "Show password";
          }
        },
        false
      );
    }
  };

  document.addEventListener("DOMContentLoaded", function() {
    var checkbox = document.querySelector("#show-password");
    var pwd = document.querySelector("#new-password");

    if (checkbox && pwd) {
      var toggler = new PasswordToggler(checkbox, pwd);
    }
  });
})();

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
