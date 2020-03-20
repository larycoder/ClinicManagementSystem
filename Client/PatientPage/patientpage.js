function addID(){
    document.getElementById("ID").innerHTML = localStorage.getItem('Clinic-ID');
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

function sessionStoreType(stringType){
    sessionStorage.setItem('Clinic-userType', stringType);
}

function getUserType(){
    return sessionStorage.getItem('Clinic-userType');
}

function setInfoText(object){
    object["full_name"] = object["first_name"] + " " + object["last_name"];
    // setup parameter depending on type of user
    sessionStoreType(object.type);
    document.getElementById("Stock").style.display = "block";
    if(getUserType() != "patient"){
        $("#recordList").html('<i class="fas fa-file-medical"></i>Search Records')
    }

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
            $(".container").css("visibility","hidden")
            if (isJson(this.responseText) == false) {
                alert('Get user info fail: can not get json');
            }
            else {
                let obj = JSON.parse(this.responseText);
                setInfoText(obj);
            }
        }
        else if (this.readyState == 4 && xmlRequest.status != 200) {
            $(".container").css("visibility","hidden")
            alert('Get user info fall: status 404');
        }
        else{
            $(".container").css("visibility","visible")
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


function clickRecordButton(){
    if(getUserType() == "patient"){
        $("#recordList").tab("show");
        requestRecordListOfUser();
    }
    else if(getUserType() == "nurse" || getUserType() == "doctor"){
        window.location.href = '/ListPatientRecord/ListPatientRecord.html';
    }
}

function requestRecordListOfUser(){
    let xmlRequest = new XMLHttpRequest();
    xmlRequest.onreadystatechange = function(){
        if(this.readyState == 4){
            $(".container").css("visibility","hidden")
            if(this.status == 200){
                if(isJson(this.responseText) == false){
                    alert("Can not get json file !");
                }
                else{
                    // doing something with json object
                    updateUserRecords(JSON.parse(this.responseText));
                }
            }
            else{
                alert("Error when trying to access service !")
            }
        }
        else{
            $(".container").css("visibility","visible")
          }
    }
    xmlRequest.open("GET", "/api/listReport?id="+getUserID()+"&patientID="+getUserID());
    xmlRequest.send();
}

function updateUserRecords(records){
    for(i in records){
        // create tag hold record
        let record = document.createElement("a");
        record.setAttribute("onclick","openRecordDetail(" + records[i].report_id + "," + "'" + records[i].date_time.substring(0, 10) + "'" + "," + "'" + records[i].report_data + "'" + ");");
        record.classList.add("list-group-item", "list-group-item-action", "list-group-item-secondary", "flex-column", "align-items-start");

        record.innerHTML = '<div class="d-flex w-100 justify-content-between"> \
                                <h5 class="mb-1">Report '+ records[i].date_time.substring(0, 10) +'</h5> \
                                    <span> \
                                    <small class="text-muted">Doctor:</small> \
                                    <small id="doctor_name" class="text-muted">'+ records[i].doctor_name +'</small> \
                                </span> \
                            </div> \
                            <p class="mb-1 text-truncate">'+ records[i].report_data +'</p>';

        document.getElementById("list-reports").appendChild(record);
    }
}

function openRecordDetail(report_id, report_time, report_note){
    if(sessionStorage.getItem('Clinic-reportID') != null){
        sessionStorage.removeItem('Clinic-reportID');
    }
    if(sessionStorage.getItem('Clinic-reportTime') != null){
        sessionStorage.removeItem('Clinic-reportTime');
    }
    if(sessionStorage.getItem('Clinic-reportNote') != null){
        sessionStorage.removeItem('Clinic-reportNote');
    }
    sessionStorage.setItem('Clinic-reportID', report_id);
    sessionStorage.setItem('Clinic-reportTime', report_time);
    sessionStorage.setItem('Clinic-reportNote', report_note);
    
    window.location.href = "/PatientPage/Record.html";
}