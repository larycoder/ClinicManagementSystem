// Back rewrite function
var service = "";
var resource = "";

var rowIDcounter = 0;

function updateMed(){
  let xmlRequest = new XMLHttpRequest();
  xmlRequest.onreadystatechange = function(){
    if(this.readyState == 4){
      if(this.status == 200){
        if(isJson(this.responseText) == false){
          alert("Can not get json file !");
        }
        else{
          // doing something with json object
          let obj_info = JSON.parse(this.responseText);
          for(i in obj_info.service){
            service += '<option value="' + obj_info.service[i].id + '">' + obj_info.service[i].name + '</option>';
          }
          for(i in obj_info.resource){
            resource += '<option value="' + obj_info.resource[i].id + '">' + obj_info.resource[i].name + '</option>';
          }
        }
      }
    }
  }
  xmlRequest.open("GET", "/api/listInfo?id=" + getUserID());
  xmlRequest.send();
}

function createIns() {
    var cols;
    cols += '<tr id="row' + rowIDcounter + '">'

    cols += '<th><select id="ser' + rowIDcounter + '" class="form-control" name="Service">' + service + '</select></th>';
    cols += '<th><input type="number" class="form-control" id="serQ' + rowIDcounter + '" name="ServiceQuantity"/></th>';
    cols += '<th><select id="res' + rowIDcounter + '" class="form-control" name="Resource">' + resource + '</select></th>';
    cols += '<th><input type="number" class="form-control" id="resQ' + rowIDcounter + '" name="ResourceQuantity"/></th>';
    cols += '<th><input type="text" class="form-control" id="note' + rowIDcounter + '" name="Notes"/></th>';

    //delete button 
    cols += '<th><input type="button" class="ibtnDel btn btn-md btn-danger"  value="Delete"></th>';
    cols += '</tr>';
    $("#inst_table").append(cols);
    rowIDcounter++;
}


    
$("#inst_table").on("click", ".ibtnDel", function (event) {
    $(this).closest("tr").remove();
});
// End Back

// Ngoc func
function getInfor() {
  var table = []
  for (var i = 0; i < rowIDcounter; i++) {
      var service = "ser" + String(i)
      console.log(service)
      var serviceQ = "serQ" + String(i)
      var resource = "res" + String(i)
      var resourceQ = "resQ" + String(i)
      var note = "note" + String(i)

      var yourServiceSelect = document.getElementById(service);
      var yourSelect = document.getElementById(resource);
      table.push({ service_id: yourServiceSelect.options[yourServiceSelect.selectedIndex].value, service_quantity: document.getElementById(serviceQ).value, resource_id: yourSelect.options[yourSelect.selectedIndex].value, resource_quantity: document.getElementById(resourceQ).value, description: document.getElementById(note).value });
  }
  return JSON.stringify(table);
}
// End Ngoc

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

function getAppointmentID4Doctor(){
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
                updateAppointment(JSON.parse(this.responseText));
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
  xmlRequest.open("GET", "/api/doctorTimes?today=x&id=" + getUserID() + "&doctorID=" + getUserID());
  xmlRequest.send();
}

function updateAppointment(list){
  let appointmentSpace = document.getElementById("appointmentSpace");
  appointmentSpace.innerHTML = "";
  for(i in list){
    if(list[i].status == 1){
      let appointment = document.createElement("option");
      appointment.value = list[i].appointment_id;
      appointment.innerHTML = list[i].patient_name + ' [ ' + list[i].from_time + ' ]';
      appointmentSpace.appendChild(appointment);
    }
  }
}

function getReportData(){
  let obj = {};
  obj["instructionList"] = getInfor();
  obj["id"] = getUserID();
  appointmentID = document.getElementById("appointmentSpace");
  obj["appointmentID"] = appointmentID.options[appointmentID.selectedIndex].value;

  obj["reportData"] = document.getElementById("DoctorNotes").value;

  return JSON.stringify(obj);
}

function uploadData(){
  let xmlRequest = new XMLHttpRequest();
  xmlRequest.onreadystatechange = function(){
    $(".container").css("visibility","hidden")
      if(this.readyState == 4){
          if(this.status == 200){
              if(isJson(this.responseText) == false){
                  alert("Can not get json file !");
              }
              else{
                  // doing something with json object
                  let obj = JSON.parse(this.responseText);
                  alert(obj.response);
              }
          }
          else{
              alert("Error when trying to access service !")
          }
          location.reload();
      }
      else{
        $(".container").css("visibility","visible")
      }
  }
  xmlRequest.open("POST", "/api/newReport");
  xmlRequest.send(getReportData());
}



$(document).ready(function(){
  getAppointmentID4Doctor();
  updateMed();
});

