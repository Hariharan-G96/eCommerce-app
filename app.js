const express = require('express')
const {categoryRoutes, productRoutes, authRoutes, cartRoutes} = require('./routes')
const app = express()

app.use(express.json()) // first we need to give express.json before routes
app.use(authRoutes)
app.use(categoryRoutes)
app.use(productRoutes)
app.use(cartRoutes)

module.exports = {app}