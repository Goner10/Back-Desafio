const CanalDifusion = require("../models/CanalDifusion");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      // Si no se proporciona un token, se considera una solicitud de inicio de sesión
      // Puedes omitir la verificación del token y simplemente pasar al siguiente middleware
      return next();
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: payload._id, tokens: token });
    if (!user) {
      return res.status(401).send({ message: "No estás autorizado" });
    }
    req.user = user;
    console.log(req.user);
    
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ error, message: "Ha habido un problema con el token" });
  }
};
//wiki lo de superadmin
const isAdmin = async (req, res, next) => {
  const admin = 'admin';
  if (!admin.includes(req.user.role)) {
    return res.status(403).send({
      message: 'No tienes permiso',
    });
  }
  next();
};
const isSuperAdmin = async (req, res, next) => {
  const superadmin = 'superadmin';
  if (!superadmin.includes(req.user.role)) {
    return res.status(403).send({
      message: 'No tienes permiso',
    });
  }
  next();
};
// cambiar CanalDifusion por events
// const isCanDifCreator = async (req, res, next) => {
//   try {
//     const candif = await CanalDifusion.findById(req.params._id);
//     if (candif.userId.toString() !== req.user._id.toString()) {
//       return res.status(403).send({ message: 'Este canal de difusion no es tuyo' });
//     }
//     next();
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send({ error, message: 'Ha habido un problema al comprobar la autoría del canal de difusion' });
//   }
// };
const modCanDif = async (req,res,next)=>{
 try {
  const modCanDif = await CanalDifusion.findById(req.params._id);
  if ((modCanDif.createdBy.toString()!==req.user._id.toString())||(req.user.role!=='superadmin')) {
    return res.status(403).send({ message: 'Este canal de difusion no es tuyo' });
  }
  next();
 } catch (error) {
  console.error(error);
  return res.status(500).send({ error, message: 'Ha habido un problema al comprobar la autoría del canal de difusion' });
 }
};
const isEventCreator = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params._id);
    if (event.userId.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: 'Este evento no es tuyo' });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error, message: 'Ha habido un problema al comprobar la autoría del evento' });
  }
};

module.exports = { authentication, isAdmin, isEventCreator,isSuperAdmin,modCanDif };
