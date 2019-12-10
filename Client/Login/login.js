function isJson(string) {
    try {
        JSON.parse(string);
    } catch (e) {
        return false;
    }
    return true;
}

function validate(){
    var uname = document.getElementById("uname").value;
    var pass = document.getElementById("pass").value;
    let xmlRequest = new XMLHttpRequest();
    xmlRequest.onreadystatechange = function(){
        if (this.readyState == 4) {
            if (isJson(this.responseText) == false) {
                alert('Login fall');
            }
            else {
                let obj = JSON.parse(this.responseText);
                var result = obj[ID];
                if (result > 0 ){
                    alert('Login successfully');
                }
                else {
                    alert('Login fall');
                }
            }
        }
    }
    xmlRequest.open("GET","/api/login?username=" + uname + "&password=" + pass);
    xmlRequest.send();
}