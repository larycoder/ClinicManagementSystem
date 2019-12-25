function SignUp () {
  let pass = document.getElementsByName("password")[0].value;
  let check = document.getElementsByName("password-repeat")[0].value;
  if (pass != check) {
    alert("not match password")
    window.location.reload();
  }
  else {
    sendMessage(makeMessage());
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

function sendMessage(string) {
  let xmlRequest = new XMLHttpRequest();
  xmlRequest.onreadystatechange = function(){
    if (this.readyState == 4) {
      if(xmlRequest.status == 201){
        alert('Register successful !\n' + this.responseText);
        location.replace('/');
      }
      else if (xmlRequest.status == 400) {
        alert('Register fall\n' + this.responseText);
      }
      window.location.reload();
    }
  }
  xmlRequest.open("POST", "/api/register");
  xmlRequest.send(string);
}