const { assert } = require('chai');

const socialNetwork = artifacts.require("./SocialNetwork.sol");

require('chai').use(require('chai-as-promised')).should()

contract('SocialNetwork',([deployer,author,tipper])=>{
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
            assert.equal(name, 'Chalie');
        })
    })
    describe('posts',async()=>{
        let postCount,result;
        before( async()=>{
            result = await socialNetworkTest.createPost('This is My First Post',{ from : author });
            postCount =  await socialNetworkTest.postCount();
        })
        it('create posts',async() => {
            assert.equal(postCount, 1);
            const event = result.logs[0].args;
            assert.equal(event.id.toNumber(), postCount.toNumber(), "Id is correct");
            assert.equal(event.content,"This is My First Post", "content is correct");
            assert.equal(event.tipAmount,'0', "Tip amount is correct");
            assert.equal(event.author,author, "Author is correct");
            await socialNetworkTest.createPost('',{from:author}).should.be.rejected;
        }) 
        it('lists posts',async()=>{
            const post =await socialNetworkTest.posts(postCount);
            assert.equal(post.id.toNumber(), postCount.toNumber(), "Id is correct");
            assert.equal(post.content,"This is My First Post", "content is correct");
            assert.equal(post.tipAmount,'0', "Tip amount is correct");
            assert.equal(post.author,author, "Author is correct");

        })
        it('allows user to tip posts',async()=>{
            let oldBalance;
                oldBalance  = await web3.eth.getBalance(author);
                oldBalance = new web3.utils.BN(oldBalance);
            result = await socialNetworkTest.tipAmount(postCount,{from:tipper,value:web3.utils.toWei('1','Ether')})
            const event = result.logs[0].args;
            assert.equal(event.id.toNumber(), postCount.toNumber(), "Id is correct");
            assert.equal(event.content,"This is My First Post", "content is correct");
            assert.equal(event.tipAmount,'1000000000000000000', "Tip amount is correct");
            assert.equal(event.author,author, "Author is correct");

            let newBalance;
            newBalance  = await web3.eth.getBalance(author);
            newBalance = new web3.utils.BN(newBalance);

            let tipAmount;
            tipAmount=web3.utils.toWei('1','Ether');
            tipAmount=new web3.utils.BN(tipAmount);

            const expectedBalance = oldBalance.add(tipAmount);
            assert.equal(newBalance.toString(),expectedBalance.toString());
            await socialNetworkTest.tipAmount(99,{from:tipper,value:web3.utils.toWei('1','Ether')}).should.be.rejected;
        })

    })
})
