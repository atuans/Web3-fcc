// abi and binary compilers are equivalent to compile button in remix
const ethers = require("ethers")
// const solc = require("solc")
const fs = require("fs-extra")
require("dotenv").config()

async function main() {
    // First, compile this!
    // And make sure to have your ganache network up!

    // the link can be http link in alchemy, moralis, this key is the wallet key (metamask private key)
    let provider = new ethers.providers.JsonRpcProvider('https://eth-rinkeby.alchemyapi.io/v2/LWF2apcveExqnSpwuKAbtoUuOuEE5sF1');
    let wallet = new ethers.Wallet('0b60e842a7780853256c696af8514fb6ec2945d0adb0332eb3d0f935c3236820', provider);
    // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
    // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    //   encryptedJson,
    //   process.env.PRIVATE_KEY_PASSWORD
    // );
    // wallet = wallet.connect(provider);
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")
    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf8"
    )
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet); //using to deploy contract 

    console.log('====================================');
    console.log('Deploying, please wait...');
    console.log('====================================');
    const contract = await contractFactory.deploy();
    console.log(contract);
    const deploymentReceipt = await contract.deployTransaction.wait(1);
    console.log(`Contract address: ${contract.address}`); // we can search for contract detail in etherscan 


    console.log('Here is the transaction receipt');
    console.log(deploymentReceipt);



    //interact with contract on ethers
    
    // a smart contract will interact with etherjs by ABI
    // ABI can be a function like function retrieve() we define in SimpleStorage.sol 
    // so, revoke the function in this deploy.js because we have it ABI 
    const currentFavNumber = await contract.retrieve(); // view function wont cause any gas 
    console.log(`Current favorite Number: ${currentFavNumber.toString()}`); // the result will be BigNumber( because in the hexadecimal representation)
    // we will get 0, because the initialize number is 0

    const StoreNumber = await contract.store('7');
    const transactionReceipt = await StoreNumber.wait(1); // this one will cost gas
    const updateNumber = await contract.retrieve();

    console.log(`Update Number ${updateNumber}`);


    //finally, deploy to a testnet or mainet, so we will use alchemy

}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
