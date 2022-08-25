const { Categories } = require('../models')

async function validateProductData(req, res, next){
    const productData = req.body;

    if(!productData.name){
        res.status(400).send({msg: 'Name is missing in Product Data'});
        return;
    }

    if(productData.CategoryId){
        const result = await Categories.findByPk(productData.CategoryId);
        
        if(result){
            next()
        }else{
            res.status(400).send({msg: 'CategoryId does not exist in the Categories table'});
            return;
        }
    }else{
        res.status(400).send({msg: 'CategoryId is missing in Product Data'});
        return;
    }
}

module.exports = {
    validateProductData
}