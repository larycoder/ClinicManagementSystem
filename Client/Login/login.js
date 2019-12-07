function login(form){
    var uname = form.Username.value;
    var pass = form.Password.value;
    var xmlhttp = new XMLHttpRequest;
    xmlhttp.open("post", "Login", true);
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp == 200)  {
            loginResults();
        }
    }
}

function