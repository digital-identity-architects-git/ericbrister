/* Eric Brister — contact form (mailto, no backend required) */
(function () {
  "use strict";

  var form = document.getElementById("contact-form");
  if (!form) return;

  var note = document.getElementById("form-note");
  var RECIPIENT = "bristereric713@gmail.com";

  var setNote = function (msg, kind) {
    if (!note) return;
    note.textContent = msg;
    note.className = "form-note" + (kind ? " is-" + kind : "");
  };

  var emailValid = function (v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var company = form.company.value.trim();
    var subject = form.subject.value.trim();
    var message = form.message.value.trim();

    if (!name || !email || !subject || !message) {
      setNote("Please fill in your name, email, subject, and message.", "error");
      return;
    }
    if (!emailValid(email)) {
      setNote("That email address doesn't look right — please double-check it.", "error");
      form.email.focus();
      return;
    }

    var lines = [
      message,
      "",
      "—",
      "From: " + name,
      "Email: " + email
    ];
    if (company) lines.push("Company: " + company);

    var mailSubject = "[ericbrister.com] " + subject;
    var mailBody = lines.join("\n");
    var href =
      "mailto:" + RECIPIENT +
      "?subject=" + encodeURIComponent(mailSubject) +
      "&body=" + encodeURIComponent(mailBody);

    // Open the user's email client with everything prefilled.
    window.location.href = href;

    setNote(
      "Opening your email app… if nothing happens, email " + RECIPIENT + " directly.",
      "success"
    );
  });
})();
