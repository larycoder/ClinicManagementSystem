function isJson(string) {
  try {
      JSON.parse(string);
  } catch (e) {
      return false;
  }
  return true;
}

function getReportID(){
  return sessionStorage.getItem('Clinic-reportID');
}

function getUserID(){
  let id = localStorage.getItem('Clinic-ID');
  if(id !== null){
      return id;
  }
  return -1;
}

function requestInstructionList(){
  let xmlRequest = new XMLHttpRequest();
    xmlRequest.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                if(isJson(this.responseText) == false){
                    alert("Can not get json file !");
                }
                else{
                    // doing something with json object
                    updateListInstruction(JSON.parse(this.responseText));
                }
            }
            else{
                alert("Error when trying to access service !");
                console.log(this.responseText);
            }
        }
    }
    xmlRequest.open("GET", "/api/listInstruction?id="+getUserID()+"&reportID="+getReportID());
    xmlRequest.send();
}

function updateReportDetail(){
  document.getElementById("report-time").innerHTML = "Report " + sessionStorage.getItem('Clinic-reportTime');
  document.getElementById("patient_diagnosis").innerHTML = sessionStorage.getItem('Clinic-reportNote');
}

function updateListInstruction(list){
  for(i in list){
    let tableRow = document.createElement("tr");
    tableRow.innerHTML = '<td id="service_name"width="15%" >'+ list[i].service_name +'</td> \
                    <td id="service_quantity" class="align-middle" width="10%">'+ list[i].service_quantity +'</td> \
                    <td id="resource_name" class="align-middle" width="15%">'+ list[i].resource_name +'</td> \
                    <td id="resource_quantity" class="align-middle" width="20%">'+ list[i].resource_quantity + ' ' + list[i].resource_unit +'</td> \
                    <td id="notes" class="align-middle" width="40%">'+ list[i].description +'</td>';

    document.getElementById("instructionList").appendChild(tableRow);
  }
}