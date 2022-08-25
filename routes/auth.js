const express = require('express')
const {signUp, signIn} = require('../controller/auth')
const { checkDuplicateUsernameAndEmail, checkRoleIsValid } = require('../middleware')

const routes = express.Router()

routes.post('/ecomm/api/v1/auth/signup', [checkDuplicateUsernameAndEmail, checkRoleIsValid], signUp)

routes.post('/ecomm/api/v1/auth/signin', signIn)

module.exports = {authRoutes: routes}