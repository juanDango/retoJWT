let jwt = require( 'jsonwebtoken' );
let config = require( './config' );
var UserModel = require('./models/user')
var CryptoJS = require('crypto-js')

// Clase encargada de la creación del token
class HandlerGenerator {

  login( req, res ) {
    
    // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
    let username = req.body.username;
    let password = req.body.password;
    
    UserModel.findOne({username: username}, (err, user) =>{
      if(err || !user){
        res.send( 400 )
        return
      }
      let mockedPassword = user.password;
      let role = user.role;

      console.log(mockedPassword)

      let pass = CryptoJS.SHA512(password).toString()

      if(mockedPassword === pass) {
        console.log("estoy aca")
        // Se genera un nuevo token para el nombre de usuario el cuál expira en 24 horas
        let token = jwt.sign( { username: username, role: role },
          config.secret, { expiresIn: '24h' } );
        
        // Retorna el token el cuál debe ser usado durante las siguientes solicitudes
        res.json( {
          success: true,
          message: 'Authentication successful!',
          token: token
        } );
      } else{
        res.send(403)
      }
    })
  }
  index( req, res ) {
    res.json( {
      success: true,
      message: 'Index page'
    } );

  }
}

module.exports = HandlerGenerator;