function addID(){
    document.getElementById("ID").value = localStorage.getItem('Clinic-ID');
}

function SignOut(){
    localStorage.removeItem('Clinic-ID');
    location.replace('/');
}

function isJson(string) {
    try {
        JSON.parse(string);
    } catch (e) {
        return false;
    }
    return true;
}

function getUserID(){
    let id = localStorage.getItem('Clinic-ID');
    if(id !== null){
        return id;
    }
    return -1;
}

function setInfoText(object){
    object["full_name"] = object["first_name"] + " " + object["last_name"];
    for(var key in object){
        if(document.getElementById(key) !== null){
            string = object[key];
            if(key == "dob"){
                string = string.slice(0, -8);
            }
            document.getElementById(key).innerHTML = string;
        }
    }
}

function sendGetUserInfoRequest(){
    let xmlRequest = new XMLHttpRequest();
    xmlRequest.onreadystatechange = function(){
        if (this.readyState == 4 && xmlRequest.status == 200) {
            if (isJson(this.responseText) == false) {
                alert('Get user info fall: can not get json');
            }
            else {
                let obj = JSON.parse(this.responseText);
                setInfoText(obj);
            }
        }
        else if (this.readyState == 4 && xmlRequest.status != 200) {
            alert('Get user info fall: status 404');
        }
    }
    xmlRequest.open("GET","/api/userInfo?id=" + getUserID());
    xmlRequest.send();
}

// icon eye in password field
$(document).ready(function () {
    $("td button").on('click', function (event) {
        event.preventDefault();
        if ($('td input').attr("type") == "text") {
            $('td input').attr('type', 'password');
            $('td i').addClass("fa-eye-slash");
            $('td i').removeClass("fa-eye");
        } else if ($('td input').attr("type") == "password") {
            $('td input').attr('type', 'text');
            $('td i').removeClass("fa-eye-slash");
            $('td i').addClass("fa-eye");
        }
    });
    $("#show_hide_current_password button").on('click', function (event) {
        event.preventDefault();
        if ($('#show_hide_current_password input').attr("type") == "text") {
            $('#show_hide_current_password input').attr('type', 'password');
            $('#show_hide_current_password i').addClass("fa-eye-slash");
            $('#show_hide_current_password i').removeClass("fa-eye");
        } else if ($('#show_hide_current_password input').attr("type") == "password") {
            $('#show_hide_current_password input').attr('type', 'text');
            $('#show_hide_current_password i').removeClass("fa-eye-slash");
            $('#show_hide_current_password i').addClass("fa-eye");
        }
    });
    $("#show_hide_new_password button").on('click', function (event) {
        event.preventDefault();
        if ($('#show_hide_new_password input').attr("type") == "text") {
            $('#show_hide_new_password input').attr('type', 'password');
            $('#show_hide_new_password i').addClass("fa-eye-slash");
            $('#show_hide_new_password i').removeClass("fa-eye");
        } else if ($('#show_hide_new_password input').attr("type") == "password") {
            $('#show_hide_new_password input').attr('type', 'text');
            $('#show_hide_new_password i').removeClass("fa-eye-slash");
            $('#show_hide_new_password i').addClass("fa-eye");
        }
    });
    $("#show_hide_repeat_password button").on('click', function (event) {
        event.preventDefault();
        if ($('#show_hide_repeat_password input').attr("type") == "text") {
            $('#show_hide_repeat_password input').attr('type', 'password');
            $('#show_hide_repeat_password i').addClass("fa-eye-slash");
            $('#show_hide_repeat_password i').removeClass("fa-eye");
        } else if ($('#show_hide_repeat_password input').attr("type") == "password") {
            $('#show_hide_repeat_password input').attr('type', 'text');
            $('#show_hide_repeat_password i').removeClass("fa-eye-slash");
            $('#show_hide_repeat_password i').addClass("fa-eye");
        }
    });
    $("#show_hide_confirm_password button").on('click', function (event) {
        event.preventDefault();
        if ($('#show_hide_confirm_password input').attr("type") == "text") {
            $('#show_hide_confirm_password input').attr('type', 'password');
            $('#show_hide_confirm_password i').addClass("fa-eye-slash");
            $('#show_hide_confirm_password i').removeClass("fa-eye");
        } else if ($('#show_hide_confirm_password input').attr("type") == "password") {
            $('#show_hide_confirm_password input').attr('type', 'text');
            $('#show_hide_confirm_password i').removeClass("fa-eye-slash");
            $('#show_hide_confirm_password i').addClass("fa-eye");
        }
    });
    $('#theModalConfirmPass').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
    })
    
});