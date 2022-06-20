const hre = require("hardhat");

async function main() {

  // const Token = await ethers.getContractFactory("DigitalRupee");
  // const token = await Token.deploy();

  const Airdrop = await ethers.getContractFactory("Airdrop");
  const airdrop = await Airdrop.deploy("0x0b2B54a9317DFc3D04651E0BFB0a3fCd9a602346","1000000000000000000");
  
  const Election = await ethers.getContractFactory("Voting");
  const election = await Election.deploy("0x0b2B54a9317DFc3D04651E0BFB0a3fCd9a602346","1000000000000000000");

  console.log("airdrop address is:", airdrop.address);
  console.log("voting address is:", election.address);

  saveFrontendFiles(airdrop,"Airdrop")
  saveFrontendFiles(election,"Voting")
}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../src/ContractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
