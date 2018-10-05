const express = require('express');
const router = express.Router();
require('dotenv').config();

// gov.uk notify setup
// https://github.com/alphagov/govuk-prototype-kit/blob/61c50892ab74c1d6290c5b776107327c31695fca/docs/documentation/using-notify.md
const NotifyClient = require('notifications-node-client').NotifyClient;
const notify = new NotifyClient(process.env.NOTIFYAPIKEY);

// Route index page
router.get('/', function(req, res) {
  res.render('index');
});

// Add your routes here - above the module.exports line

// Send out email at start of journey with code to paste into website
router.post('/0-eligibility/setup', (req, res) => {
  if (!req.body.email) {
    res.send('Email is required');
  } else {
    notify
      .sendEmail('f3fcdcb6-dd32-4d63-81a5-992164a74d14', req.body.email)
      .then(response => console.log('Account setup email sent'))
      .catch(err => console.error(err));
    res.redirect('/0-eligibility/confirm-identity');
  }
});

// Send out email after section 4 has been competed (Submit application button clicked) with link to return to recieve feedback
router.post('/application-complete', (req, res) => {
  if (!req.session.data['standard-name'] || !req.session.data['email']) {
    res.send('Email and standard have not been completed');
  } else {
    notify
      .sendEmail(
        'e19c06cb-eb30-4a22-91b4-a3638a364583',
        req.session.data['email'],
        {
          standard: req.session.data['standard-name']
        }
      )
      .then(response => console.log('Failed application email sent'))
      .catch(err => console.error(err));
    res.redirect('/application-complete');
  }
});

// Send out email after feedback questions have been competed (Re-submit application button clicked) with link to return to application successful page
router.post('/re-submit-application', (req, res) => {
  if (!req.session.data['standard-name'] || !req.session.data['email']) {
    res.send('Email and standard have not been completed');
  } else {
    notify
      .sendEmail(
        '62d2febd-cb2f-4dc2-9cd8-180a082a2b89',
        req.session.data['email'],
        {
          standard: req.session.data['standard-name']
        }
      )
      .then(response => console.log('Failed application email sent'))
      .catch(err => console.error(err));
    res.redirect('/application-complete');
  }
});

module.exports = router;
