var RoleModel = require('./models/role')

const verificar = (req, res, next) => {
    role = req.decoded.role;
    RoleModel.findById(role).then(role=>{
        if(!role){
          res.send(404)
        }
        permissions = role.permisos;
        const permiso = permissions.find(element => element.ruta==req.originalUrl)
        if(!permiso){
          res.send(400)
        }else{
          next()
        }
      }
    )
};

module.exports = {
    verificar: verificar
}