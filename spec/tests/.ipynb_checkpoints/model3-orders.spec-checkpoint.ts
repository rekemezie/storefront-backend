import { Orders } from '../../src/models/Orders';
const order = new Orders(); 

describe("3: Orders model: ", function () {
    
    
    it("test 1: should have a getOrdersByUsers method", () => {
        expect(order.getOrdersByUsers).toBeDefined()
    });

    it("test 2: should have a getCompletedOrdersUser method", () => {
        expect(order.getCompletedOrdersByUser).toBeDefined()
    });
    
    it("test 3: gets all orders for user with id 1", async function (done) {
        await order.createOrder({user_id: 1, status: 'active'})
        await order.createOrder({user_id: 1, status: 'active'})
        await order.createOrder({user_id: 2, status: 'complete'})
        await order.createOrder({user_id: 3, status: 'active'})
        await order.createOrder({user_id: 1, status: 'complete'})
        await order.createOrder({user_id: 1, status: 'complete'})

        const result  = await order.getOrdersByUsers(1);
        expect(result.length).toEqual(4); 

        done();
    });
     
    it("test 4: gets a orders with status complete by user with id 1", async function (done) {
        await order.addProduct(20,5,1);
        await order.addProduct(1,6,4);
        const result = await order.getCompletedOrdersByUser(1)
        expect(result.length).toEqual(2);
        done();
    });
});
