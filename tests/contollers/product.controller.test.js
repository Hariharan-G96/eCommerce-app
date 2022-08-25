const {createProduct, getAllProducts, filterProducts} = require('../../controller/product')
const {Products} = require('../../models')
const {mockRequest,mockResponse} = require('../interceptor')

describe('Product Controller testing', () => {

    let req, res;

    beforeEach(() => {
        req = mockRequest();
        res = mockResponse();
    })

    it('test success createProductController', async () => {
        const testPayload = {
            name: 'Streax Serum',
            description: 'Refreshens your scalp',
            cost: 250,
            quantity: 12,
            CategoryId: 1
        }
        req.body = testPayload;
        const createProductSpy = jest.spyOn(Products, 'create').mockImplementation((testPayload) => Promise.resolve(testPayload));

        await createProduct(req, res)

        expect(createProductSpy).toHaveBeenCalled();
        expect(Products.create).toHaveBeenCalledWith(testPayload)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalled()
        expect(res.send).toHaveBeenCalledWith({"msg": 'Product got created', 
        "result": {
            name: 'Streax Serum',
            description: 'Refreshens your scalp',
            cost: 250,
            quantity: 12,
            CategoryId: 1
        }})
    })

    it('test error createProductController', async () => {
        const testPayload = {
            name: 'Streax Serum',
            description: 'Refreshens your scalp',
            cost: 250,
            quantity: 12,
            CategoryId: 1
        }
        req.body = testPayload;
        const createProductSpy = jest.spyOn(Products, 'create').mockImplementation((testPayload) => Promise.reject('Product Creation error'));

        await createProduct(req, res)

        expect(createProductSpy).toHaveBeenCalled();
        expect(Products.create).toHaveBeenCalledWith(testPayload)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalled()
        expect(res.send).toHaveBeenCalledWith({"msg": 'Internal Server Error', 
        "err": 'Product Creation error'})
    })

    it('test success findAllProductController', async () => {

        const getAllProductsSpy = jest.spyOn(Products, 'findAll').mockImplementation(() => {
            return Promise.resolve([
                {
                    name: 'Streax Serum',
                    description: 'Refreshens your scalp',
                    cost: 250,
                    quantity: 12,
                    CategoryId: 1
                }])
            })

        await getAllProducts(req, res)
        expect(getAllProductsSpy).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith([{
                    name: 'Streax Serum',
                    description: 'Refreshens your scalp',
                    cost: 250,
                    quantity: 12,
                    CategoryId: 1
        }])
    })

})