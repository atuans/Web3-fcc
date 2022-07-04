const {task} = require("hardhat/config");
const Web3 = require('web3');
const web3 = new Web3();



//get account balance we using setAction 
task('getBalance','getBalance of account')
.setAction(async(taskArgs) =>{
    const account = web3.utils.toChecksumAddress(taskArgs.account);
    const balance = await web3.eth.getBalance(account);
    
    console.log(web3.utils.fromWei(balance, "ether"), "ETH");
})

module.exports ={}