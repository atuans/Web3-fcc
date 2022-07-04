const { inputToConfig } = require('@ethereum-waffle/compiler');
const {ethers} = require('hardhat')
const { expect, assert } = require("chai");



//hardhat and mocha will recognize this function 
describe('SimpleStorage',()=>{

    //in order to test, we need to deploy our contract first
    let SimpleStorage, simplestorage; // define to interact with it() function

     beforeEach(async ()=>{
        SimpleStorage = await ethers.getContractFactory('SimpleStorage');
        simplestorage = await SimpleStorage.deploy();

     }); //tell us what to do, before going to some functionality


    it('Should start with favorite number 0', async ()=>{

        //code to make sure that the number is 0
        const currentValue = await simplestorage.retrieve();
        const expectedValue = '0';

        //assert is a function help us make sure that is what we expected to be
        assert.equal(currentValue.toString(), expectedValue, "OK, start with number 0");

    });

    it('Should update when we call store', async() =>{
        
        const expectedValue = 7;
        const transactionRespose = await simplestorage.store(expectedValue);
        await transactionRespose.wait(1);

        const currentValue = await simplestorage.retrieve();

        assert.equal(currentValue.toString(), expectedValue);
    });
});