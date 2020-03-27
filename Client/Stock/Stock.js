// SearchResourceByCode
function SearchResourceByCode() {
    var input, filter, table, tr, td, i, txtValue;
    document.getElementById("NameSearch").value = "";
    input = document.getElementById("CodeSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("ResourceTable");
    tr = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

// Search by Name 
function SearchResourceByName() {
    var input, filter, table, tr, td, i, txtValue;
    document.getElementById("CodeSearch").value = "";
    input = document.getElementById("NameSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("ResourceTable");
    tr = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
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

function getUserID(){
let id = localStorage.getItem('Clinic-ID');
if(id !== null){
    return id;
}
return -1;
}

function updateStock(){
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
            let table = document.getElementById("ResourceTable").getElementsByTagName("tbody")[0];
            for(i in obj_info){
                let string = '<tr>';
                string += '<th scope="row">' + obj_info[i].id + '</th>';
                string += '<td>' + obj_info[i].code + '</td>';
                string += '<td>' + obj_info[i].name + '</td>';
                string += '<td>' + obj_info[i].unit + '</td>';
                string += '<td>' + obj_info[i].quantity + '</td>';
                string += '<td>' + obj_info[i].status + '</td>';
                string += '<td>' + obj_info[i].price + '</td>';
                string += '</tr>';
                table.innerHTML += string;
            }
          }
        }
      }
    }
    xmlRequest.open("GET", "/api/listResource?id=" + getUserID());
    xmlRequest.send();  
}

$(document).ready(function(){
    updateStock();
  });