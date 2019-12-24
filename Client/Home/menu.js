function checkSignIn(){
  var ID = localStorage.getItem('Clinic-ID');
  if(ID == null || ID == '-1'){
    document.getElementById("Home-Block").style.display = 'none';
    document.getElementById("Schedule-Block").style.display = 'none';
    document.getElementById("Login-Block").style.display = 'block';
    document.getElementById("Register-Block").style.display = 'block';
  }
  else{
    document.getElementById("Home-Block").style.display = 'block';
    document.getElementById("Schedule-Block").style.display = 'block';
    document.getElementById("Login-Block").style.display = 'none';
    document.getElementById("Register-Block").style.display = 'none';
  }
}

checkSignIn();