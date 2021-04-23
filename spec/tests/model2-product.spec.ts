import { IProduct, Products } from '../../src/models/Products';
const product = new Products(); 

describe("2: Product model: ", function () {
    
    
    it("test 1: should have an index method", () => {
        expect(product.index).toBeDefined()
    });

    it("test 2: should have a getProductById method", () => {
        expect(product.getProductById).toBeDefined()
    });

    it("test 3: should have a createProduct method", () => {
        expect(product.createProduct).toBeDefined()
    });
    
    it("test 4: gets all products from database", async function (done) {
        const result  = await product.index();
        
        expect(result.length).toEqual(0); 

        done();
    });
     
    it("test 5: creates new products:", async function(done){
        const newProduct = {name: "shoe", price: 30, category: "boot"};
        const newProduct1 = {name: "Hp Pavallion", price: 860, category: "laptop"};
        const newProduct2 = {name: "Dell Latitude", price: 500, category: "laptop"};
        const newProduct3 = {name: "Asus", price: 700, category: "laptop"};
        const newProduct4 = {name: "IPhone 12", price: 300, category: "phone"};

        await product.createProduct(newProduct);
        await product.createProduct(newProduct1); 
        await product.createProduct(newProduct2); 
        await product.createProduct(newProduct3); 
        await product.createProduct(newProduct4);

        const afterCreate = await product.index();

        expect(afterCreate.length).toEqual(5);

        done();
    });

    it("test 6: gets a product by Product ID", async function (done) {

        const result = await product.getProductById(1)
        const expectedResult: IProduct = {id: 1, name: 'shoe', price: 30, category: 'boot'};

        expect(result.id).toEqual(expectedResult.id);
        expect(result.name).toEqual(expectedResult.name);
        expect(Number(result.price)).toEqual(Number(expectedResult.price));
        expect(result.category).toEqual(expectedResult.category);

        done();
    });
});
