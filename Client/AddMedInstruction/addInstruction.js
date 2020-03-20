const $tableID = $('#table');
const $BTN = $('#export-btn');
const $EXPORT = $('#export');

const newTr = `
<tr>
    <td class="align-middle" width="15%">
      <div class="input-group">
        <select id="Service" class="form-control selectpicker" data-live-search="true">
          <option>None</option>
          <option data-tokens="take medicine">Take Medicine</option>
          <option data-tokens="inject">Inject</option>
          <option data-tokens="blood test">Blood Test</option>
          <option data-tokens="ct scan">CT Scan</option>
        </select>
      </div> 
    </td>
    <td id="ServiceQuantity" class="align-middle" width="10%"><input type="text" value="1"></td>
    <td class="align-middle" width="15%" contenteditable="true">
      <div class="input-group ">
        <select id="Resource" class="form-control selectpicker " data-live-search="true">
          <option>None</option>
          <option data-tokens="insulin glargine">insulin glargine</option>
          <option data-tokens="paracetamon">paracetamol</option>
          <option data-tokens="morphine">morphine</option>
          <option data-tokens="benzonatate">benzonatate</option>
        </select>
      </div> 
    </td>
    <td class="align-middle" width="20%">
      <div class="input-group">
        <input id="ResourceQuantity" type="number" class="form-control" style="float: left;">
        <select id="ResourceUnit" class="form-control" style="float: left;">
          <option>None</option>
          <option>ml</option>
          <option>boxes</option>
        </select>
      </div>  
    </td>
    <td id="Notes" class="align-middle" width="30%" contenteditable="true" style="word-wrap: break-word"></td>
    <td class="align-middle" width="10%">
      <span class="table-remove"><button type="button"
          class="btn btn-danger btn-rounded btn-sm my-0">Remove</button></span>
    </td>
</tr>`;

$('.table-add').on('click', 'i', () => {
  const $clone = $tableID.find('tbody tr').last().clone(true).removeClass('hide table-line');

  if ($tableID.find('tbody tr').length === 0) {

    $('tbody').append(newTr);
  }

  $tableID.find('table').append($clone);
});

$tableID.on('click', '.table-remove', function () {

  $(this).parents('tr').detach();
});

$tableID.on('click', '.table-up', function () {

  const $row = $(this).parents('tr');

  if ($row.index() === 1) {
    return;
  }

  $row.prev().before($row.get(0));
});

$tableID.on('click', '.table-down', function () {

  const $row = $(this).parents('tr');
  $row.next().after($row.get(0));
});

// A few jQuery helpers for exporting only
jQuery.fn.pop = [].pop;
jQuery.fn.shift = [].shift;

$BTN.on('click', () => {

  const $rows = $tableID.find('tr:not(:hidden)');
  const headers = [];
  const data = [];

  // Get the headers (add special header logic here)
  $($rows.shift()).find('th:not(:empty)').each(function () {

    headers.push($(this).text().toLowerCase());
  });

  // Turn all existing rows into a loopable array
  $rows.each(function () {
    const $td = $(this).find('td');
    const h = {};

    // Use the headers from earlier to name our hash keys
    headers.forEach((header, i) => {

      h[header] = $td.eq(i).text();
    });

    data.push(h);
  });

  // Output the result
  $EXPORT.text(JSON.stringify(data));
});

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
  obj["instructionList"] = [];
  let list = document.getElementById("instructionList");
  for(i=0; i<list.rows.length; i++){
    let instruction = list.getElementsByTagName("tr")[i];

    let service = instruction.getElementsByClassName("Service")[1];
    obj["instructionList"].push({'service_id':String(service.selectedIndex)});

    let serviceQuantity = instruction.getElementsByClassName("ServiceQuantity")[0];
    obj["instructionList"].push({'service_quantity':String(serviceQuantity.getElementsByTagName("input")[0].value)});

    let resource = instruction.getElementsByClassName("Resource")[1];
    obj["instructionList"].push({'resource_id':String(resource.selectedIndex)});

    let resourceQuantity = instruction.getElementsByClassName("ResourceQuantity")[0];
    obj["instructionList"].push({'resource_quantity':String(resourceQuantity.value)});

    let data = instruction.getElementsByClassName("Notes")[0];
    obj["instructionList"].push({'description':String(data.innerHTML)});
  }

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
                  alert(JSON.parse(this.responseText));
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
  xmlRequest.open("POST", "/api/newReport");
  xmlRequest.send(getReportData());
}



$(document).ready(function(){
  getAppointmentID4Doctor();
});

