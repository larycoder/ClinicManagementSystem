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

function getListReports(){
  let id = document.getElementById("inputPatientID").value;
  if(id == ""){
    alert("Input Patient Id");
  }
  else{
    // get list of patient reports
    requestPatientReports(id);
  }
}

function requestPatientReports(patientID){
  let xmlRequest = new XMLHttpRequest();
    xmlRequest.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                if(isJson(this.responseText) == false){
                    alert("Can not get json file !");
                }
                else{
                    // doing something with json object
                    updatePatientReportList(JSON.parse(this.responseText));
                }
            }
            else{
                alert("Error when trying to access service !");
                console.log(this.responseText);
            }
        }
    }
    xmlRequest.open("GET", "/api/listReport?id="+getUserID()+"&patientID="+patientID);
    xmlRequest.send();
}

function updatePatientReportList(list){
  let reportSpace = document.getElementById("reportSpace");
  reportSpace.innerHTML = ""; // remove old reports

  for(i in list){
    let report = document.createElement("a");
    report.classList.add("list-group-item", "list-group-item-action", "list-group-item-secondary", "flex-column", "align-items-start");
    report.setAttribute("onclick","openRecordDetail(" + list[i].report_id + "," + "'" + list[i].date_time.substring(0, 10) + "'" + "," + "'" + list[i].report_data + "'" + ");");
    report.innerHTML = '<div class="d-flex w-100 justify-content-between"> \
                          <h5 class="mb-1">Report '+ list[i].date_time.substring(0, 10) +'</h5> \
                          <span> \
                            <small class="text-muted">Doctor Name:</small> \
                            <small id="doctor_name" class="text-muted">'+ list[i].doctor_name +'</small> \
                          </span> \
                        </div> \
                        <p class="mb-1 text-overflow"></p> \
                        <span> \
                          <small class="text-muted">Patient Name:</small> \
                          <small id="patient_name" class="text-muted">'+ list[i].patient_name +'</small> \
                        </span> \
                        <span> \
                          <small class="text-muted pl-3">Patient ID:</small> \
                          <small id="patient_id" class="text-muted">'+ list[i].patient_id +'</small> \
                        </span>';
    reportSpace.appendChild(report);
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