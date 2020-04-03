// variable to keep resource information
var resource_obj = null;

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
        $(".loader-container").css("visibility","hidden")
        if(this.status == 200){
          if(isJson(this.responseText) == false){
            alert("Can not get json file !");
          }
          else{
            // doing something with json object
            let obj_info = JSON.parse(this.responseText);
            let table = document.getElementById("ResourceTable").getElementsByTagName("tbody")[0];
            let selection = document.getElementById("resource_quantity_update");
            for(i in obj_info){
                // add resource to table
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
                // add resource to all select option in page
                string = '<option value="' + obj_info[i].id + '">';
                string += obj_info[i].name;
                string += '</option>';
                selection.innerHTML += string;
            }
            // refresh all selection in page
            $('.selectpicker').selectpicker('refresh');
            // store resource info to global variable
            resource_obj = obj_info;
            // initialize quanlity of update table
            let r_id = $('#resource_quantity_update').children("option:selected").val();
            updateUpdateTable(getResoureById(r_id));
          }
        }
      }
      else{
        $(".loader-container").css("visibility","visible")
      }
    }
    xmlRequest.open("GET", "/api/listResource?id=" + getUserID());
    xmlRequest.send();  
}

function getResoureById(id){
    for(i in resource_obj){
        if(resource_obj[i].id == id){
            return resource_obj[i];
        }
    }
    return null;
}

// too complicate even with me to understand what that mean
function updateUpdateTable(obj){
    document.getElementById("code_of_update_table").placeholder = obj.code;
    document.getElementById("unit_of_update_table").placeholder = obj.unit;
    document.getElementById("quantity_of_update_table").placeholder = obj.quantity;
}

// create new resource to database
function createResource(){
    // collect information
    let new_resource = "";
    new_resource += "name=" + document.getElementById("name_in_CR").value + "&";
    new_resource += "code=" + document.getElementById("code_in_CR").value + "&";
    new_resource += "quantity=" + document.getElementById("quantity_in_CR").value + "&";
    new_resource += "price=" + document.getElementById("price_in_CR").value + "&";
    // get selected unit
    let table = document.getElementById("unit_in_CR");
    new_resource += "unit=" + table.options[table.selectedIndex].text;

    // send information to database
    let request = new XMLHttpRequest();
    request.open("POST", "/api/createResource", 1);
    if(this.readyState == 4){
        $(".loader-container").css("visibility","hidden")
    å}
    else{
        $(".loader-container").css("visibility","visible")
    }
    request.send("id=" + getUserID() + "&" + new_resource);
    request.onload = function(){
        if(request.status == 200){
            // do something
            if(isJson(request.responseText) == false){
                alert("Can not get Json file");
            }
            else{
                alert("Server Response: " + JSON.parse(request.responseText).return);
                window.location.reload();
            }
        }
        else{
            alert("Error: " + request.status + "\nCan not upload new resource");
        }
    };
}

function updateResource(){
    // collect information
    let resource = "";
    resource += "resourceID=" + $('#resource_quantity_update').children("option:selected").val() + "&";
    resource += "quantity=" + document.getElementById("QI_of_update_table").value + "&";
    resource += "type=" + $('#type_of_update_table').children("option:selected").val();

    // send information
    let rq = new XMLHttpRequest();
    rq.open("POST", "/api/updateResource", 1);
    if(this.readyState == 4){
        $(".loader-container").css("visibility","hidden")
    å}
    else{
        $(".loader-container").css("visibility","visible")
    }
    rq.send("id=" + getUserID() + "&" + resource);
    rq.onload = function(){
        if(rq.status == 200){
            // do something
            if(isJson(rq.responseText) == false){
                alert("Can not get Json file");
            }
            else{
                alert("Server Response: " + JSON.parse(rq.responseText).return);
                window.location.reload();
            }
        }
        else{
            alert("Error: " + rq.status + "\nCan not upload new resource");
        }
    };
}

$(document).ready(function(){
    // update information from the server
    updateStock();
    // update quality of update table when the user change selection
    $('#resource_quantity_update').change(function (){
        let r_id = $(this).children("option:selected").val();
        updateUpdateTable(getResoureById(r_id));
    });
  });