import { Users, IUser } from '../../src/models/Users';

const user = new Users(); 

describe("1: Users model: ", function () {
    
    
    it("test 1: should have an index method", () => {
        expect(user.index).toBeDefined()
    });

    it("test 2: should have a getUsersById method", () => {
        expect(user.getUsersById).toBeDefined()
    });

    it("test 3: should have a createUser method", () => {
        expect(user.createUser).toBeDefined()
    });

    it("test 4: index method gets all users from database", async function (done) {
        const result  = await user.index();
        expect(result.length).toEqual(1); 
        done();
    });

    it("test 5: creates new users:", async function(done){
        
        const newUser = {firstname: "John", lastname: "Doe", username: "johndoe", password: "newpassword1"};
        const newUser1 = {firstname: "Jon", lastname: "Do", username: "jondoe", password: "newpassword2"};
        const newUser2 = {firstname: "Pete", lastname: "Poe", username: "petepoe", password: "newpassword3"};
        const newUser3 = {firstname: "Dete", lastname: "Toe", username: "detetoe", password: "newpassword4"};
        await user.createUser(newUser);
        await user.createUser(newUser1);
        await user.createUser(newUser2); 
        await user.createUser(newUser3);  

        const afterCreate = await user.index();

        expect(afterCreate.length).toBe(5)
        
        done();
     });
     
    it("test 6: gets user by ID", async function (done) {
        const result = await user.getUsersById(2);

        const expectResults: IUser = {id: 2, firstname: 'John', lastname: 'Doe', username: "johndoe", password: 'newpassword1'} ;
        
        expect(result.id).toEqual(expectResults.id);
        expect(result.firstname).toEqual(expectResults.firstname);
        expect(result.lastname).toEqual(expectResults.lastname);

        done();
    });
    
});
