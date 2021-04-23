import { Orders } from '../../src/models/Orders';
const order = new Orders(); 

describe("3: Orders model: ", function () {
    
    
    it("test 1: should have a createOrder method", () => {
        expect(order.createOrder).toBeDefined()
    });

    it("test 2: should have an addProduct method", () => {
        expect(order.addProduct).toBeDefined()
    });

    it("test 3: should have a getOrdersByUsers method", () => {
        expect(order.getOrdersByUsers).toBeDefined()
    });

    it("test 4: should have a getCompletedOrdersUser method", () => {
        expect(order.getCompletedOrdersByUser).toBeDefined()
    });

    it("test 5: gets all orders for user with id 1", async function(done) {
        await order.createOrder({user_id: 3, status: 'active'})
        await order.createOrder({user_id: 3, status: 'active'})
        await order.createOrder({user_id: 4, status: 'complete'})
        await order.createOrder({user_id: 5, status: 'active'})
        await order.createOrder({user_id: 3, status: 'complete'})
        await order.createOrder({user_id: 3, status: 'complete'})

        const result  = await order.getOrdersByUsers(3);
        
        expect(result.length).toEqual(4); 

        done();
    });

    it("test 6: adds products to existing users' orders", async function (done) {
        await order.addProduct(20,5,1);
        await order.addProduct(1,6,4);
        const result = await order.getCompletedOrdersByUser(3)
        expect(result.length).toEqual(2);
        done();
    });
});
