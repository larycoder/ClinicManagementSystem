mysql = {
  'host': '127.0.0.1',
  'user': 'server1',
  'password': 'password',
  'database': 'Clinic',
  'raise_on_warnings': True
}

query = {
  'verify_login': "SELECT COUNT(*) FROM user WHERE username = %s AND password = %s",


  
}