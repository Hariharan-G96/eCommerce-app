const jwt = require('jsonwebtoken')
const { Users } = require('../models')

async function verifyToken(req, res, next){
    const token = req.headers['x-access-token']

    if(token){
        try{
        const result = await jwt.verify(token, 'helloIAmSecretKey')
        if(result){
            req.userId = result.id // To attach user id in the request object
            next()
        }else{
            res.status(400).send({msg: 'authToken has expired. Please Re-login'});
            return;
        }
    }catch(err){
        res.status(400).send({msg: 'authToken has expired. Please Re-login'});
    }
    }else{
        res.status(401).send({msg: 'authToken is missing'});
        return;
    }
}

async function isAdmin(req, res, next){
    const userId = req.userId;

    try{
        const user = await Users.findByPk(userId);
        const userRoles = await user.getRoles();
        for(let i=0; i<userRoles.length; i++){
            if(userRoles[i].dataValues.name === 'Admin'){
                next()
                return;
            }
        }
        res.status(400).send({msg: 'User does not have Admin access'});
        return;
    }catch(err){
        res.status(500).send({msg: 'Internal Server Error', err});
        return;
    }
}

module.exports = {
    verifyToken,
    isAdmin
}