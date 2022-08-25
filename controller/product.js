const { Products, Sequelize } = require('../models')

async function createProduct(req, res){
    const productData = req.body;

    // if(!(productData.name && productData.cost && productData.quantity)){ defined in middleware/product
    //     res.status(400).send({msg: 'Name, Cost & Quantity fields are missing'});
    // }

    try{
        const name = productData.name;
        const description = productData.description;
        const cost = productData.cost;
        const quantity = productData.quantity;
        const CategoryId = productData.CategoryId;
        
        const result = await Products.create({name, description, cost, quantity, CategoryId});
        res.status(200).send({msg: 'Product got created', result})
    }catch(err){
        res.status(500).send({msg: 'Internal Server Error', err})
    }
}

async function getAllProducts(req, res){

    try{
        const result = await Products.findAll();
        res.status(200).send(result)
    }catch(err){
        res.status(500).send({msg: 'Internal Server Error', err})
    }
}

async function getProductOnId(req, res){
    const productId = req.params.id;
    try{
        const result = await Products.findOne({
            where: {
                id: productId
            }
        });
        res.status(200).send(result)
    }catch(err){
        res.status(500).send({msg: 'Internal Server Error', err})
    }
}

async function updateProduct(req, res){
    const productData = req.body;
    const productId = req.params.id;

    if(!(productData.name && productData.cost && productData.quantity)){
        res.status(400).send({msg: 'Name, Cost & Quantity fields are missing'});
    }

    try{
        const name = productData.name;
        const description = productData.description;
        const cost = productData.cost;
        const quantity = productData.quantity;
        const CategoryId = productData.CategoryId;

        const product = await Products.findOne({
            where: {
                id: productId
            }
        })

        if(product){
            product.name = name;
            product.cost = cost;
            product.description = description;
			product.quantity = quantity;
            product.CategoryId = CategoryId;

            product.save()

            res.status(200).send({msg: 'Product got updated successfully', 
            updatedProduct: product})
        }else{
            res.status(400).send({msg: 'productId does not exist'})
        }
    }catch(err){
        res.status(500).send({msg: 'Internal Server Error', err})
    }
}

async function deleteProduct(req, res){
    const productId = req.params.id;

    try{
        await Products.destroy({
            where: {
                id: productId
            }
        })

        res.status(200).send({msg: 'Product deleted successfully'})
    }catch(err){
        res.status(500).send({msg: 'Internal Server Error', err})
    }
}

async function filterProducts(req, res){
    const CategoryId = req.query.CategoryId; // ?CategoryId = 3
    const productName = req.query.name; // ?name = "productName"
    const minCost = req.query.minCost; // ?minCost = 250
    const maxCost = req.query.maxCost; // ?maxCost = 350
    // const publishedDate = req.query.createdAt;
    try{
    if(CategoryId){
        const result = await Products.findAll({
            where: {
                CategoryId: CategoryId
            }
        })
        res.status(200).send(result);
        return;
    }
    if(productName){
        const result = await Products.findAll({
            where: {
                name: productName
            }
        })
        res.status(200).send(result);
        return;
    }
    if(minCost && maxCost){
        const result = await Products.findAll({
            where: {
                cost: {
                    [Sequelize.Op.gte]: minCost,
                    [Sequelize.Op.lte]: maxCost
                }
            }
        })
        res.status(200).send(result);
        return;
    }else if(minCost){
        const result = await Products.findAll({
            where: {
                cost: {
                    [Sequelize.Op.gte]: minCost
                }
            }
        })
        res.status(200).send(result);
        return;
    }else if(maxCost){
        const result = await Products.findAll({
            where: {
                cost: {
                    [Sequelize.Op.lte]: maxCost
                }
            }
        })
        res.status(200).send(result);
        return;
    }else{
        const result = await Products.findAll()
        res.status(200).send(result);
        return;
    }
    // if(CategoryId && publishedDate){
    //     const result = await Products.findAll({
    //         where: {
    //             CategoryId: CategoryId,
    //             createdAt: {
    //                 [Sequelize.Op.gte]: publishedDate,
    //             }
    //         }
    //     })
    //     res.send(result);
    // }
}catch(err){
    res.status(500).send({msg: 'Internal Server Error', err});
     }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductOnId,
    updateProduct,
    deleteProduct,
    filterProducts
}