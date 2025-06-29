import { ethers } from 'ethers';

// Dummy ABIs (minimal interfaces)
const WitnessNFTABI = [
  "function createWitness(address to, string name, string caseId, string metadataURI, address authorizedJudge) external returns (uint256)",
  "function getWitnessInfo(uint256 tokenId) external view returns (tuple(string name, string caseId, string metadataURI, uint256 createdAt, address authorizedJudge, bool isActive))"
];

const EvidenceManagerABI = [
  "function submitEvidence(string caseId, string evidenceHash, string metadataURI) external returns (uint256)",
  "function getEvidence(uint256 evidenceId) external view returns (tuple(string caseId, string evidenceHash, string metadataURI, uint256 createdAt, address submitter, bool isVerified))"
];

const ExpertDAOABI = [
  "function createProposal(string title, string description, string caseId, string evidenceURI, uint256 votingPeriod) external returns (uint256)",
  "function castVote(uint256 proposalId, bool support) external",
  "function getProposal(uint256 proposalId) external view returns (tuple(string title, string description, string caseId, string evidenceURI, uint256 createdAt, address creator, uint256 votingPeriod, uint256 forVotes, uint256 againstVotes, bool executed, bool canceled))"
];

const PaymentSystemABI = [
  "function createPayment(string caseId, string paymentType, address recipient, uint256 amount) external returns (uint256)",
  "function processPayment(uint256 paymentId) external payable",
  "function getPayment(uint256 paymentId) external view returns (tuple(string caseId, string paymentType, address recipient, uint256 amount, uint256 createdAt, bool isPaid))"
];

const AdliSurecTakipABI = [
  "function createCase(string caseId, string title, string description) external",
  "function updateCaseStatus(string caseId, bool isActive) external",
  "function getCaseInfo(string caseId) external view returns (tuple(string caseId, string title, string description, uint256 createdAt, address createdBy, bool isActive))",
  "function getAllCaseIds() external view returns (string[])",
  "function getActiveCaseIds() external view returns (string[])",
  "function createWitness(address to, string name, string caseId, string metadataURI, address authorizedJudge) external returns (uint256)",
  "function submitEvidence(string caseId, string evidenceHash, string metadataURI) external returns (uint256)",
  "function createProposal(string title, string description, string caseId, string evidenceURI, uint256 votingPeriod) external returns (uint256)",
  "function createPayment(string caseId, string paymentType, address recipient, uint256 amount) external returns (uint256)"
];

// Contract addresses (to be filled after deployment)
const CONTRACT_ADDRESSES = {
  WitnessNFT: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  EvidenceManager: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  ExpertDAO: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
  PaymentSystem: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
  AdliSurecTakip: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
};

class ContractService {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.contracts = {};
    this.isInitialized = false;
  }

  async init() {
    if (this.isInitialized) return;

    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Create provider and signer
        this.provider = new ethers.BrowserProvider(window.ethereum);
        this.signer = await this.provider.getSigner();

        // Initialize contracts
        this.contracts.witnessNFT = new ethers.Contract(
          CONTRACT_ADDRESSES.WitnessNFT,
          WitnessNFTABI,
          this.signer
        );

        this.contracts.evidenceManager = new ethers.Contract(
          CONTRACT_ADDRESSES.EvidenceManager,
          EvidenceManagerABI,
          this.signer
        );

        this.contracts.expertDAO = new ethers.Contract(
          CONTRACT_ADDRESSES.ExpertDAO,
          ExpertDAOABI,
          this.signer
        );

        this.contracts.paymentSystem = new ethers.Contract(
          CONTRACT_ADDRESSES.PaymentSystem,
          PaymentSystemABI,
          this.signer
        );

        this.contracts.adliSurecTakip = new ethers.Contract(
          CONTRACT_ADDRESSES.AdliSurecTakip,
          AdliSurecTakipABI,
          this.signer
        );

        this.isInitialized = true;
        console.log('Contract service initialized successfully');
      } catch (error) {
        console.error('Error initializing contract service:', error);
        throw error;
      }
    } else {
      throw new Error('Ethereum provider not found. Please install MetaMask.');
    }
  }

  // WitnessNFT methods
  async createWitness(to, name, caseId, metadataURI, authorizedJudge) {
    await this.init();
    try {
      const tx = await this.contracts.adliSurecTakip.createWitness(
        to,
        name,
        caseId,
        metadataURI,
        authorizedJudge
      );
      await tx.wait();
      return tx;
    } catch (error) {
      console.error('Error creating witness:', error);
      throw error;
    }
  }

  async getWitnessInfo(tokenId) {
    await this.init();
    try {
      return await this.contracts.witnessNFT.getWitnessInfo(tokenId);
    } catch (error) {
      console.error('Error getting witness info:', error);
      throw error;
    }
  }

  // Evidence methods
  async submitEvidence(caseId, evidenceHash, metadataURI) {
    await this.init();
    try {
      const tx = await this.contracts.adliSurecTakip.submitEvidence(
        caseId,
        evidenceHash,
        metadataURI
      );
      await tx.wait();
      return tx;
    } catch (error) {
      console.error('Error submitting evidence:', error);
      throw error;
    }
  }

  async getEvidence(evidenceId) {
    await this.init();
    try {
      return await this.contracts.evidenceManager.getEvidence(evidenceId);
    } catch (error) {
      console.error('Error getting evidence:', error);
      throw error;
    }
  }

  // DAO methods
  async createProposal(title, description, caseId, evidenceURI, votingPeriod) {
    await this.init();
    try {
      const tx = await this.contracts.adliSurecTakip.createProposal(
        title,
        description,
        caseId,
        evidenceURI,
        votingPeriod
      );
      await tx.wait();
      return tx;
    } catch (error) {
      console.error('Error creating proposal:', error);
      throw error;
    }
  }

  async castVote(proposalId, support) {
    await this.init();
    try {
      const tx = await this.contracts.expertDAO.castVote(proposalId, support);
      await tx.wait();
      return tx;
    } catch (error) {
      console.error('Error casting vote:', error);
      throw error;
    }
  }

  async getProposal(proposalId) {
    await this.init();
    try {
      return await this.contracts.expertDAO.getProposal(proposalId);
    } catch (error) {
      console.error('Error getting proposal:', error);
      throw error;
    }
  }

  // Payment methods
  async createPayment(caseId, paymentType, recipient, amount) {
    await this.init();
    try {
      const tx = await this.contracts.adliSurecTakip.createPayment(
        caseId,
        paymentType,
        recipient,
        amount
      );
      await tx.wait();
      return tx;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  }

  async processPayment(paymentId, amount) {
    await this.init();
    try {
      const tx = await this.contracts.paymentSystem.processPayment(paymentId, {
        value: ethers.parseEther(amount.toString()),
      });
      await tx.wait();
      return tx;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  }

  async getPayment(paymentId) {
    await this.init();
    try {
      return await this.contracts.paymentSystem.getPayment(paymentId);
    } catch (error) {
      console.error('Error getting payment:', error);
      throw error;
    }
  }

  // Case methods
  async createCase(caseId, title, description) {
    await this.init();
    try {
      const tx = await this.contracts.adliSurecTakip.createCase(
        caseId,
        title,
        description
      );
      await tx.wait();
      return tx;
    } catch (error) {
      console.error('Error creating case:', error);
      throw error;
    }
  }

  async getCaseInfo(caseId) {
    await this.init();
    try {
      return await this.contracts.adliSurecTakip.getCaseInfo(caseId);
    } catch (error) {
      console.error('Error getting case info:', error);
      throw error;
    }
  }

  async getAllCaseIds() {
    await this.init();
    try {
      return await this.contracts.adliSurecTakip.getAllCaseIds();
    } catch (error) {
      console.error('Error getting all case IDs:', error);
      throw error;
    }
  }

  async getActiveCaseIds() {
    await this.init();
    try {
      return await this.contracts.adliSurecTakip.getActiveCaseIds();
    } catch (error) {
      console.error('Error getting active case IDs:', error);
      throw error;
    }
  }

  // Utility methods
  async getAccount() {
    await this.init();
    try {
      return await this.signer.getAddress();
    } catch (error) {
      console.error('Error getting account:', error);
      throw error;
    }
  }

  async getBalance() {
    await this.init();
    try {
      const address = await this.signer.getAddress();
      const balance = await this.provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('Error getting balance:', error);
      throw error;
    }
  }
}

export default new ContractService(); 