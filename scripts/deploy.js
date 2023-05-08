const hre = require("hardhat");
const fs = require('fs')

async function main(){
    const School = await hre.ethers.getContractFactory("School");
    const school = await School.deploy(ethers.utils.parseEther("1"));
    await school.deployed();
    console.log("School contract deployed to: ", school.address);

    let config = `module.exports ={
        schooladdress : "${school.address}"
    }
    `
    let data = JSON.stringify(config)
    fs.writeFileSync('config.js', JSON.parse(data))
}

main()
    .then(() => process.exit(0))
    .catch((error)=>{
        console.error(error);
        process.exit(1);
    });