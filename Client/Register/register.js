function SignUp () {
  let pass = document.getElementsByName("password")[0].value;
  let check = document.getElementsByName("password-repeat")[0].value;
  if (pass != check) {
    alert("not match password")
    window.location.reload();
  }
  else {
    makeMessage();
  }
}

function makeMessage() {
  let values = "";
  $('form').submit(false);
  $('input').each(function () {
    if (this.type != "radio") {
      values = values + $(this).attr("name") + "=" + $(this).val() + "&";
    }
  });
  alert("\n" + values.slice(0, -1));
}