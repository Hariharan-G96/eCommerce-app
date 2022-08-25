const { Categories } = require('../models')

async function createCategory(req, res){
    const data = req.body;

    // if(!data.name){ defined in middleware/category
    //     res.status(400).send({msg:'name is mandatory'})
    // }

    const name = data.name;
    const description = data.description;

    try{
        const result = await Categories.create({name, description})
        console.log('result', result);
        res.status(200).send({msg: 'Category has been created'});
    }catch(err){
        console.log('error in creation of a category', err);
        res.status(500).send({msg: 'Internal Server Error'})
    }

}

async function getAllCategory(req, res){
    try{
        const result = await Categories.findAll();
        res.status(200).send(result)
    }catch(err){
      console.log('No categories found', err);
      res.status(500).send({msg: 'Internal Server Error'})
    }

}

async function getCategoryOnId(req, res){
    const categoryId = req.params.id;

    try{
        const result = await Categories.findOne({
            where : {
                id : categoryId
            }
        })
        res.status(200).send(result);
    }catch(err){
        console.log('Error in getting a category based on ID', err);
        res.status(500).send({msg: 'Internal Server Error'})
    }
}

async function updateCategory(req, res){
    const categoryId = req.params.id;

    try{
        const result = await Categories.findOne({
            where : {
                id : categoryId
            }
        })
        if(result){
            result.name = req.body.name;
            result.description = req.body.description;
            
            result.save()

            res.status(200).send({msg: 'Category got updated',
        updatedCategory: result})
        }
        else{
            console.log('Error in finding a category', err);
            res.status(400).send({msg: 'categoryId does not exist'})
        }
    }catch(err){
        console.log('Error in updating the category', err);
        res.status(500).send({msg: 'Internal Server Error'})
    }
}

async function deleteCategory(req, res){
    const categoryId = req.params.id;

    try{
        const result = await Categories.destroy({
            where : {
                id : categoryId
            }
        })

            res.status(200).send({msg: 'Category got deleted', result})
    }catch(err){
        console.log('Error in deleting a category', err);
        res.status(500).send({msg: 'Internal Server Error'})
    }
}

module.exports = {
    createCategory,
    getAllCategory,
    getCategoryOnId,
    updateCategory,
    deleteCategory
}