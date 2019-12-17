// $('.li-modal').on('click', function (e) {
        //     e.preventDefault();
        //     $('#theModal').modal('show');
        // });
$('#theModal').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset');
})

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
