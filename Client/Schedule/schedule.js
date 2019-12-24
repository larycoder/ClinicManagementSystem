
$( function() {
  $( "#datepicker" ).datepicker({
    dateFormat: "yy-mm-dd",
    minDate: 0,
    maxDate: 14,
  });
  

  $('#timepicker').timepicker({
    timeFormat: 'HH:mm',
    interval: 30,
    minTime: '8:00am',
    maxTime: '5:00pm',
    dynamic: false,
    dropdown: true,
    scrollbar: true
  });

} );




function test(){
  alert(getStart() );
}

