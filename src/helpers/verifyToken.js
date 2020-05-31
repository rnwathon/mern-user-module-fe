import jwt from 'jsonwebtoken';

function verifyToken() {
  // Cek dulu ada token gak di localStorage
  let token = localStorage.getItem('token');
  // Kalau ada kita return false
  if(!token) return false;
  // Assign jwt ket dari .env
  let jwtkey = process.env.REACT_APP_KEY;

  try {
    // Verify token yang ada di localStorage & return true
    jwt.verify(token, jwtkey)
    return true
  } catch(err) {
    // Kalau tokennya gak verified, return false
    console.log(err, "ERROR")
    return false
  }
}

export default verifyToken;
