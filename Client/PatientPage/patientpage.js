function addID(){
    document.getElementById("ID").value = localStorage.getItem('Clinic-ID');
}

function SignOut(){
    localStorage.removeItem('Clinic-ID');
    location.replace('/');
}

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
});
