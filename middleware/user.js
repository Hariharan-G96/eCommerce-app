const { Users, Roles, Sequelize } = require('../models')

async function checkDuplicateUsernameAndEmail(req, res, next){
    if(req.body.username){
        const user = await Users.findOne({
            where: {
                username: req.body.username
            }
        });

        if(user){
            res.status(400).send({msg: 'Username already exists'});
            return;
        }
    }else{
        res.status(400).send({msg: 'Username is mandatory'});
        return;
    }

    if(req.body.email){
        const email = await Users.findOne({
            where: {
                email: req.body.email
            }
        });

        if(email){
            res.status(400).send({msg: 'Email already exists'});
            return;
        }
    }else{
        res.status(400).send({msg: 'Email is mandatory'});
        return;
    }

    next()
}

async function checkRoleIsValid(req, res, next){
    if(req.body.roles){
        const roles = req.body.roles; // [1,2]
        let flag = true;
        const findRolesFromRolesTable = await Roles.findAll({
            attributes: ['id']
        });

        if(findRolesFromRolesTable.length > 0){
            const storeRoles = [];
            for(let i=0; i<findRolesFromRolesTable.length; i++){
                storeRoles.push(findRolesFromRolesTable[i].dataValues.id);
            }

            for(let i=0; i<roles.length; i++){
                const result = storeRoles.includes(roles[i]);

                if(!result){
                    flag = false;
                    break;
                }
            }

            if(flag){
                next()
            }else{
                res.status(400).send({msg: 'Role Id is invalid, does not exist'});
                return;
            }
        }else{
            res.status(500).send({msg: 'Internal Server Error, No Roles found'});
            return;
        }
    }else{
        next()
    }
}

module.exports = {
    checkDuplicateUsernameAndEmail,
    checkRoleIsValid
}