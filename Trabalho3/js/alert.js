let divAlert = $("#alert-customize");
divAlert.hide();

function createAlert(type, message) {
  divAlert.addClass("alert-" + type);
  $("#alert-customize p").text(message);
  divAlert.show();
}

