const {checkNameForCategory} = require('./category')
const {validateProductData} = require('./product')
const {checkDuplicateUsernameAndEmail, checkRoleIsValid} = require('./user')
const { verifyToken, isAdmin } = require('./authJwt')

module.exports = {
    checkNameForCategory,
    validateProductData,
    checkDuplicateUsernameAndEmail,
    checkRoleIsValid,
    verifyToken,
    isAdmin
}