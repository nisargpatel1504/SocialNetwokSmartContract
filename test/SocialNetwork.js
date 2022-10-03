const socialNetwork = artifacts.require("./SocialNetwork.sol");

require('chai').use(require('chai-as-promised')).should()

contract('SocialNetwork',(accounts)=>{
    let socialNetworkTest;
    before( async()=>{
        socialNetworkTest =await  socialNetwork.deployed();
    })
    describe('deployment',()=>{
        it('deploys successfully',async()=>{
            const address =  socialNetworkTest.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, "");
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        })
        it('has a name',async()=>{
            const name = await socialNetworkTest.name();
            console.log(name);
            assert.equal(name, 'Chalie');
        })
        describe('posts',async()>{
        it('create posts',async() => {

        })
        it('lists posts',async()=>{
            
        })
        it('allows user to tip posts',async()=>{
            
        })
            
        })
    })
})
