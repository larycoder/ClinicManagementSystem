function addID(){
    document.getElementById("ID").value = localStorage.getItem('Clinic-ID');
}

function SignOut(){
    localStorage.removeItem('Clinic-ID');
    location.replace('/');
}

// icon eye in password field
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
    $("#show_hide_current_password button").on('click', function (event) {
        event.preventDefault();
        if ($('#show_hide_current_password input').attr("type") == "text") {
            $('#show_hide_current_password input').attr('type', 'password');
            $('#show_hide_current_password i').addClass("fa-eye-slash");
            $('#show_hide_current_password i').removeClass("fa-eye");
        } else if ($('#show_hide_current_password input').attr("type") == "password") {
            $('#show_hide_current_password input').attr('type', 'text');
            $('#show_hide_current_password i').removeClass("fa-eye-slash");
            $('#show_hide_current_password i').addClass("fa-eye");
        }
    });
    $("#show_hide_new_password button").on('click', function (event) {
        event.preventDefault();
        if ($('#show_hide_new_password input').attr("type") == "text") {
            $('#show_hide_new_password input').attr('type', 'password');
            $('#show_hide_new_password i').addClass("fa-eye-slash");
            $('#show_hide_new_password i').removeClass("fa-eye");
        } else if ($('#show_hide_new_password input').attr("type") == "password") {
            $('#show_hide_new_password input').attr('type', 'text');
            $('#show_hide_new_password i').removeClass("fa-eye-slash");
            $('#show_hide_new_password i').addClass("fa-eye");
        }
    });
    $("#show_hide_repeat_password button").on('click', function (event) {
        event.preventDefault();
        if ($('#show_hide_repeat_password input').attr("type") == "text") {
            $('#show_hide_repeat_password input').attr('type', 'password');
            $('#show_hide_repeat_password i').addClass("fa-eye-slash");
            $('#show_hide_repeat_password i').removeClass("fa-eye");
        } else if ($('#show_hide_repeat_password input').attr("type") == "password") {
            $('#show_hide_repeat_password input').attr('type', 'text');
            $('#show_hide_repeat_password i').removeClass("fa-eye-slash");
            $('#show_hide_repeat_password i').addClass("fa-eye");
        }
    });
    $("#show_hide_confirm_password button").on('click', function (event) {
        event.preventDefault();
        if ($('#show_hide_confirm_password input').attr("type") == "text") {
            $('#show_hide_confirm_password input').attr('type', 'password');
            $('#show_hide_confirm_password i').addClass("fa-eye-slash");
            $('#show_hide_confirm_password i').removeClass("fa-eye");
        } else if ($('#show_hide_confirm_password input').attr("type") == "password") {
            $('#show_hide_confirm_password input').attr('type', 'text');
            $('#show_hide_confirm_password i').removeClass("fa-eye-slash");
            $('#show_hide_confirm_password i').addClass("fa-eye");
        }
    });
    $('#theModalConfirmPass').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
    })
    
});