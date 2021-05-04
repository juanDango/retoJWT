var express = require('express');
var router = express.Router();
var UserModel = require('../models/user')
var RoleModel = require('../models/role')
var CryptoJS = require('crypto-js')

var HandlerGenerator = require("../handlegenerator.js");
var middleware = require("../middleware.js");
var verificar = require('../verify.js')

HandlerGenerator = new HandlerGenerator();

/* GET home page. */
router.get('/', middleware.checkToken, HandlerGenerator.index);

router.post( '/login', HandlerGenerator.login);

router.post('/signUp',(req, res, next)=>{
    let user = req.body
    console.log(req.originalUrl)
    user.password = CryptoJS.SHA512(user.password)
    UserModel.create(req.body, (err, user) => {
      err? res.status(400).send(err): res.status(201).send(user);
    });
})

router.post('/addRole', middleware.checkToken, verificar.verificar, (req, res, next)=>{
  RoleModel.create(req.body, (err, role) => {
    err? res.status(400).send(err): res.status(201).send(role);
  });
})

router.get('/verUsuarios', middleware.checkToken, verificar.verificar, (req, res, next)=>{
  UserModel.find({}).populate({path: "role"}).exec().then(usuarios => {
    if(!usuarios){
      res.send(404)
    }
    console.log(usuarios)
    let usrs = []
    for (let i = 0; i<usuarios.length; i++){
      let usr = {
        username: usuarios[i].username,
        role: usuarios[i].role.name
      }
      usrs.push(usr)
    }
    res.send(usrs)
  });
})

router.get('/verUsuario', middleware.checkToken, verificar.verificar, (req, res, next)=>{
  usr = req.decoded
  UserModel.findOne({username: usr.username}).populate({path: "role"}).exec().then(usuario => {
    if(!usuario){
      res.send(404)
    }
    let usr = {
      username: usuario.username,
      role: usuario.role.name
    }
    res.send(usr)
  });
})

router.get('/verRoles', middleware.checkToken, verificar.verificar, (req, res, next)=>{
  usr = req.decoded
  RoleModel.find({}).exec().then(roles => {
    if(!roles){
      res.send(404)
    }
    res.send(roles)
  });
})

module.exports = router;
