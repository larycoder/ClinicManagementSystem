function SignUp () {
  let pass = document.getElementsByName("password")[0].value;
  let check = document.getElementsByName("password-repeat")[0].value;
  if (pass != check) {
    alert("not match password")
    window.location.reload();
  }
  else {
    message = makeMessage();
    alert(message);
  }
}

function makeMessage() {
  let values = "";
  $('form').submit(false);
  $('input').each(function () {
    if (this.type != "radio" && $(this).attr("name") != "password-repeat") {
      values = values + $(this).attr("name") + "=" + $(this).val() + "&";
    }
    else if (this.type == "radio") {
      if (this.checked == true) {
        values = values + $(this).attr("name") + "=" + $(this).val() + "&";
      }
    }
  });
  return values.slice(0, -1);
}