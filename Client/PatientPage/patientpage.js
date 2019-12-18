// $('.li-modal').on('click', function (e) {
        //     e.preventDefault();
        //     $('#theModal').modal('show');
        // });
// $('#theModal').on('hidden.bs.modal', function () {
//     $(this).find('form').trigger('reset');
// })
// $('#theModalAll').on('hidden.bs.modal', function () {
//     $(this).find('form').trigger('reset');
// })
// $(document).ready(function () {
  

var infotype;
var placeholderr;
function myFunction(infotype) {
    switch (infotype) {
        case 'address':
            placeholderr = "Enter new address";
            break;
        case 'phonenum':
            placeholderr = "Enter new phone number";
            break;
        case 'ssn':
            placeholderr = "Enter new ssn";
            break;
        case 'ecname':
            placeholderr = "Enter new emergency contact name";
            break;
        case 'ecphone':
            placeholderr = "Enter new emergency contact phone";
            break;
        case 'ecrel':
            placeholderr = "Enter new emergency contact relationship";
            break;
        case 'username':
            placeholderr = "Enter new username";
            break;
        case 'password':
            placeholderr = "Enter new password";
            break;
        default:
            placeholderr = "Enter";
    }

    document.getElementById("modalinput").placeholder = placeholderr;

}
function myFunction2(input){
    switch (input) {
        case profile:
            

    }
}

$(document).ready(function () {
    $("#show_hide_password a").on('click', function (event) {
        event.preventDefault();
        if ($('#show_hide_password input').attr("type") == "text") {
            $('#show_hide_password input').attr('type', 'password');
            $('#show_hide_password i').addClass("fa-eye-slash");
            $('#show_hide_password i').removeClass("fa-eye");
        } else if ($('#show_hide_password input').attr("type") == "password") {
            $('#show_hide_password input').attr('type', 'text');
            $('#show_hide_password i').removeClass("fa-eye-slash");
            $('#show_hide_password i').addClass("fa-eye");
        }
    });
});
