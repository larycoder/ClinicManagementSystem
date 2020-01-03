// process with api
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

function getListDoctor() {
  let xmlRequest = new XMLHttpRequest();
  xmlRequest.onreadystatechange = function(){
    if (this.readyState == 4) {
      if(xmlRequest.status == 200){
        if(isJson(this.responseText)){
          var list = JSON.parse(this.responseText);
          var doctorOption = document.getElementById("listDoctor");
          for(doctor in list){
            let name = list[doctor].doctor_name;
            let newDocOp = document.createElement("option");
            newDocOp.value = doctor;
            newDocOp.innerHTML = name;
            doctorOption.appendChild(newDocOp);
          }
        }
      }
    }
  }
  xmlRequest.open("GET", "/api/doctorList?id=" + getUserID());
  xmlRequest.send();
}
