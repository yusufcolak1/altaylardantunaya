// Deployment script for Adli Süreç Takip Sistemi contracts

import { ethers } from "hardhat";

async function main() {
  console.log("Deploying Adli Süreç Takip Sistemi contracts...");

  // Get contract factories
  const WitnessNFT = await ethers.getContractFactory("WitnessNFT");
  const EvidenceManager = await ethers.getContractFactory("EvidenceManager");
  const ExpertDAO = await ethers.getContractFactory("ExpertDAO");
  const PaymentSystem = await ethers.getContractFactory("PaymentSystem");
  const AdliSurecTakip = await ethers.getContractFactory("AdliSurecTakip");

  // Deploy individual contracts
  console.log("Deploying WitnessNFT...");
  const witnessNFT = await WitnessNFT.deploy("Adli Tanık NFT", "ATNFT");
  await witnessNFT.waitForDeployment();
  console.log("WitnessNFT deployed to:", await witnessNFT.getAddress());

  console.log("Deploying EvidenceManager...");
  const evidenceManager = await EvidenceManager.deploy();
  await evidenceManager.waitForDeployment();
  console.log("EvidenceManager deployed to:", await evidenceManager.getAddress());

  console.log("Deploying ExpertDAO...");
  const expertDAO = await ExpertDAO.deploy();
  await expertDAO.waitForDeployment();
  console.log("ExpertDAO deployed to:", await expertDAO.getAddress());

  console.log("Deploying PaymentSystem...");
  const paymentSystem = await PaymentSystem.deploy();
  await paymentSystem.waitForDeployment();
  console.log("PaymentSystem deployed to:", await paymentSystem.getAddress());

  // Deploy main contract
  console.log("Deploying AdliSurecTakip...");
  const adliSurecTakip = await AdliSurecTakip.deploy(
    await witnessNFT.getAddress(),
    await evidenceManager.getAddress(),
    await expertDAO.getAddress(),
    await paymentSystem.getAddress()
  );
  await adliSurecTakip.waitForDeployment();
  console.log("AdliSurecTakip deployed to:", await adliSurecTakip.getAddress());

  console.log("All contracts deployed successfully!");

  // Output all contract addresses
  console.log("\nContract Addresses:");
  console.log("-------------------");
  console.log("WitnessNFT:", await witnessNFT.getAddress());
  console.log("EvidenceManager:", await evidenceManager.getAddress());
  console.log("ExpertDAO:", await expertDAO.getAddress());
  console.log("PaymentSystem:", await paymentSystem.getAddress());
  console.log("AdliSurecTakip:", await adliSurecTakip.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 