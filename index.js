const {serverPort} = require('./config/server.config')
const express = require('express')
const { Categories, sequelize, Products, Roles } = require('./models')
const {categoryRoutes, productRoutes, authRoutes, cartRoutes} = require('./routes')
const app = express()

app.use(express.json()) // first we need to give express.json before routes
app.use(authRoutes)
app.use(categoryRoutes)
app.use(productRoutes)
app.use(cartRoutes)

app.listen(serverPort, async () => {
    console.log('Server is running on this port:', serverPort);
    await init()
})

async function init(){
    try{
        await sequelize.sync({force: true}); // in order to write all the models name we can simply use sequelize.sync
        // await sequelize.authenticate();
        // await Categories.sync({force: true});
        // await Products.sync({force: true});

        const defaultProducts = [
            {
                "description":"Nykaa's recommended",
                "name" :"Nykaa Lipstick",
                "cost": 870,
                "quantity": 50,
                "CategoryId": 1
            },
            {
                "description":"Gold Dark Vanilla & Oud Wood perfume",
                "name" :"Axe-Signature",
                "cost": 280,
                "quantity": 75,
                "CategoryId": 2
            },
            {
                "description":"Best fit cotton tees for hottest summer",
                "name" :"Ralph Lauren T-Shirts",
                "cost": 1200,
                "quantity": 100,
                "CategoryId": 3
            },
            {
                "description":"Ponni nadhiyin varalarai sollum kaaviyam",
                "name" :"Ponniyin Selvan",
                "cost": 250,
                "quantity": 50,
                "CategoryId": 4
            },
            {
                "description":"Cindrella's Adventures is on your home",
                "name" :"Cindrella-The book of a love",
                "cost": 200,
                "quantity": 40,
                "CategoryId": 4
            }
        ]
        
        const defaultCategories = [
            {
			name : 'Beauty',
			description: 'All Beauty Products'
		},
		{
			name: 'Fragrance',
			description: 'All Fragrance Products'
		},
        {
			name: 'Clothes',
			description: 'All Types/Brands of Clothes'
		},
        {
            "name": "Books",
            "description": "All kinds of Books"
        }
    ]

    const defaultRoles = [
        {
            name: 'User'
        },
        {
            name: 'Admin'
        }
    ]

    await Categories.bulkCreate(defaultCategories)
    await Products.bulkCreate(defaultProducts)
    await Roles.bulkCreate(defaultRoles)
    }catch(err){
        console.log(err)
    }

}



// console.log('ServerPort', serverPort)

// console.log('Port', process.env.PORT)
// console.log('App_Name', process.env.APP_NAME)