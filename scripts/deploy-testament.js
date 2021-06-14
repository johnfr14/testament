const chalk = require('chalk');
const hre = require('hardhat')
const fsPromises = require('fs/promises');

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // Optionnel car l'account deployer est utilisé par défaut
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  // Calculator deployment
  const Testament = await hre.ethers.getContractFactory('Testament')
  const testament = await Testament.deploy(deployer.address, "0xDb9725dB6E6CfbcFe47CC1D174B2E62993a533f4");

  await testament.deployed();

  console.log(chalk.green('success'), 'Calculator deployed to:', testament.address, '\n');

  const keyAddress = 'address';
  const keyNetwork = hre.network.name;
  const addressJSON = {};
  const networkJSON = {};
  addressJSON[keyAddress] = testament.address;
  networkJSON[keyNetwork] = addressJSON;

  const deployedJSON = {
    Testament: networkJSON,
  };

  try {
    await fsPromises.writeFile('./deployed.json', JSON.stringify(deployedJSON));
  } catch (e) {
    console.log(e.message);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
