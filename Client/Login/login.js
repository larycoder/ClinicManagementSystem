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
        if (this.readyState == 4 && xmlRequest.status == 200) {
            let Json = this.responseText;
            if (isJson(Json) == false) {
                alert('Login fall: can not get json');
            }
            else {
                let obj = JSON.parse(Json);
                var result = obj.id
                if (result > 0 ){
                    localStorage.setItem('Clinic-ID', JSON.stringify(result));
                    location.replace('/');
                }
                else {
                    alert('Login fall: account is not exit');
                }
            }
        }
        else if (this.readyState == 4 && xmlRequest.status != 200) {
            alert('Login fall: status 404');
        }
    }
    xmlRequest.open("POST","/api/login");
    xmlRequest.send("username=" + uname + "&password=" + pass);
}