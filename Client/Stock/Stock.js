// SearchResourceByCode
function SearchResourceByCode() {
    var input, filter, table, tr, td, i, txtValue;
    document.getElementById("NameSearch").value = "";
    input = document.getElementById("CodeSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("ResourceTable");
    tr = table.getElementsByTagName("tr");
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

// Search by Name 
function SearchResourceByName() {
    var input, filter, table, tr, td, i, txtValue;
    document.getElementById("CodeSearch").value = "";
    input = document.getElementById("NameSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("ResourceTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
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