function validate(){
    var uname = document.getElementById("uname").value;
    var pass = document.getElementById("pass").value;
    let xmlRequest = new XMLHttpRequest();
    xmlRequest.onreadystatechange = function(){
        let obj = JSON.parse(this.responseText);
        var result = obj[uname];
        if (result == pass){
            alert('Login successfully');
        }
            
    }
    xmlRequest.open("GET","login.json");
    xmlRequest.send();
}