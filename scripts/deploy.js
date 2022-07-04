/*

deploy file structure

//import

//async function 


//main function

*/
const { ethers, run, network } = require("hardhat");

 
async function main(){
  const SimpleStorage = await ethers.getContractFactory('SimpleStorage');
  const simplestorage = await SimpleStorage.deploy();
  await simplestorage.deployed();
  console.log(`Contract deployed to ${simplestorage.address}`);
  console.log(network.config);

  // where the JSON-RPC link and where the private key

  // So, whenever we run a scripts or a deploy test in hardhat, it default we are using hardhat network
  //in this case, is hardhat fake network, similar to ganache, because in hardhat.config.js, we still not define the network we want to deploy
 
  if(network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY){
    await simplestorage.deployTransaction.wait(6);
    await verify(simplestorage.address,[]);
  }

  //interact with the contract 
  const currentValue = await simplestorage.retrieve();
  console.log(`Current value: ${currentValue}`);
  //wait for the respose
  const transactionRespose = await simplestorage.store(7);
  await transactionRespose.wait(1); //wait 1 block for update
  //print the update  value 
  const updateValue = await simplestorage.retrieve();
  console.log(`After update value: ${updateValue}`);

  // till now, the contract get verified
}




//verify our contract 

async function verify(contractAddress, args){
  console.log('Verifying contract');

  try {
    await run('Verify', {
      address: contractAddress,
      constructorArguments: args,
    });
    
  } catch(e) {
     if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!")
    } else {
      console.log(e)
    }
  }
}


main()  
  .then(() => process.exit(0))
  .catch((error) =>{
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    process.exit(1);
  });