function getBook(){
  let date = document.getElementById("datepicker").value;
  let time = document.getElementById("timepicker").value;
  return date + " " + time;
}


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
            newDocOp.value = list[doctor].id;
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

function createBook(){
  let xmlRequest = new XMLHttpRequest();
  xmlRequest.onreadystatechange = function(){
    if(this.readyState == 4){
      if(this.status == 201){
        alert("Create Book: OK");
      }
      else {
        alert("Create Book: false");
      }
    }
  }
  xmlRequest.open("POST", "/api/doctorBook");
  xmlRequest.send("id=" + getUserID() + "&from_time=" + getBook() + "&doctorID=" + getCurrentDoctorID());
}

function getCurrentDoctorID(){
  let select = document.getElementById("listDoctor");
  return select.options[select.selectedIndex].value;
}

function loadNewDoctorID(){
  let xmlRequest = new XMLHttpRequest();
  xmlRequest.onreadystatechange = function(){
    if(this.readyState == 4){
      if(this.status == 200){
        console.log(this.responseText);
      }
    }
  }
  xmlRequest.open("GET", "/api/doctorTimes?id=" + getUserID() + "&doctorID=" + getCurrentDoctorID());
  xmlRequest.send();
}

// calendar
var calendar;

function createCalendar(){
  calendarPos = document.getElementById('calendar');
  calendar = new FullCalendar.Calendar(calendarPos, {
    plugins: ['interaction', 'timeGrid'],

    header: {
      left: 'today prev,next',
      center: 'title',
      right: ''
    },

    // Calendar View
    minTime: "08:00:00",
    maxTime: "18:00:00",
    slotDuration: '00:30:00',
    aspectRatio: 1.8,
    defaultView: 'timeGridWeek',
    allDaySlot: false,

    dateClick: function(info) {
      let dateString = info.dateStr;
      document.getElementById('datepicker').value = dateString.substring(0, 10);
      document.getElementById('timepicker').value = dateString.substring(11, 16);
    }
  });

  calendar.render();
}

function updateEvent(){
  let date = document.getElementById('datepicker').value;
  let time = document.getElementById('timepicker').value;
  let dateObject = new Date(date + " " + time);

  let startTime = dateObject.getTime();

  dateObject.setMinutes(dateObject.getMinutes() + 30);

  let endTime = dateObject.getTime();
  console.log(startTime + '\n' + endTime);

  let selectedDoc = document.getElementById("listDoctor");
  if(selectedDoc.selectedIndex == 0) {
    alert("please choose doctor to pick");
    return false;
  }
  let name = selectedDoc.options[selectedDoc.selectedIndex].innerHTML;

  calendar.addEvent({
    title: name,
    start: startTime,
    end: endTime
  });
}

// document.addEventListener('DOMContentLoaded', function () {
//   var calendarEl = document.getElementById('calendar');

//   var calendar = new FullCalendar.Calendar(calendarEl, {
    // plugins: ['interaction', 'timeGrid'],
    // header: {
    //   left: 'today prev,next',
    //   center: 'title',
    //   right: ''
    // },

    // // Calendar View
    // minTime: "08:00:00",
    // maxTime: "18:00:00",
    // slotDuration: '00:30:00',
    // aspectRatio: 1.8,
    // defaultView: 'timeGridWeek',
    // allDaySlot: false,

    // editable: true,

    // //Events
    // defaultTimedEventDuration: '00:30:00',
    // forceEventDuration: true,



    // events: [
    //   {

    //     id: '1',
    //     title: 'Event1',
    //     start: '2019-12-22T09:00:00'
    //   },
    //   {
    //     title: 'Event2',
    //     start: '2019-12-22T09:30:00'
    //   }
    // ],
    // eventColor: '#378006',


    
//     // Change user event color
//     eventRender: function (event, element) {
//     var userID = '1';
//       if (event.id == userID) {
//         element.css({
//               'background-color': '#333333',
//               'border-color': '#333333'
//           });

//       }
//     },  

//   });

//   calendar.render();
// });