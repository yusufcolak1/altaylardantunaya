import { createContext, useContext, useState, useEffect } from 'react';
import ContractService from '../services/ContractService';

// Create context
const BlockchainContext = createContext();

export const useBlockchain = () => useContext(BlockchainContext);

export const BlockchainProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [networkId, setNetworkId] = useState(null);

  // Initialize blockchain connection
  const initialize = async () => {
    if (isInitialized) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      await ContractService.init();
      
      const account = await ContractService.getAccount();
      setAccount(account);
      
      const balance = await ContractService.getBalance();
      setBalance(balance);
      
      const { chainId } = await ContractService.provider.getNetwork();
      setNetworkId(Number(chainId));
      
      setIsInitialized(true);
      
      // Set up event listeners
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    } catch (error) {
      console.error('Error initializing blockchain:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle account change
  const handleAccountsChanged = async (accounts) => {
    if (accounts.length === 0) {
      // User disconnected their wallet
      setAccount(null);
      setBalance(null);
      setIsInitialized(false);
    } else if (accounts[0] !== account) {
      // User switched accounts
      setAccount(accounts[0]);
      
      try {
        const balance = await ContractService.getBalance();
        setBalance(balance);
      } catch (error) {
        console.error('Error getting balance:', error);
      }
    }
  };

  // Handle network change
  const handleChainChanged = (chainId) => {
    window.location.reload();
  };

  // Disconnect wallet
  const disconnect = () => {
    setAccount(null);
    setBalance(null);
    setIsInitialized(false);
    
    // Remove event listeners
    window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    window.ethereum.removeListener('chainChanged', handleChainChanged);
  };

  // Witness NFT methods
  const createWitness = async (to, name, caseId, metadataURI, authorizedJudge) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await ContractService.createWitness(to, name, caseId, metadataURI, authorizedJudge);
      return result;
    } catch (error) {
      console.error('Error creating witness:', error);
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getWitnessInfo = async (tokenId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await ContractService.getWitnessInfo(tokenId);
      return result;
    } catch (error) {
      console.error('Error getting witness info:', error);
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Evidence methods
  const submitEvidence = async (caseId, evidenceHash, metadataURI) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await ContractService.submitEvidence(caseId, evidenceHash, metadataURI);
      return result;
    } catch (error) {
      console.error('Error submitting evidence:', error);
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getEvidence = async (evidenceId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await ContractService.getEvidence(evidenceId);
      return result;
    } catch (error) {
      console.error('Error getting evidence:', error);
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // DAO methods
  const createProposal = async (title, description, caseId, evidenceURI, votingPeriod) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await ContractService.createProposal(title, description, caseId, evidenceURI, votingPeriod);
      return result;
    } catch (error) {
      console.error('Error creating proposal:', error);
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const castVote = async (proposalId, support) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await ContractService.castVote(proposalId, support);
      return result;
    } catch (error) {
      console.error('Error casting vote:', error);
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getProposal = async (proposalId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await ContractService.getProposal(proposalId);
      return result;
    } catch (error) {
      console.error('Error getting proposal:', error);
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Payment methods
  const createPayment = async (caseId, paymentType, recipient, amount) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await ContractService.createPayment(caseId, paymentType, recipient, amount);
      return result;
    } catch (error) {
      console.error('Error creating payment:', error);
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const processPayment = async (paymentId, amount) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await ContractService.processPayment(paymentId, amount);
      return result;
    } catch (error) {
      console.error('Error processing payment:', error);
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getPayment = async (paymentId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await ContractService.getPayment(paymentId);
      return result;
    } catch (error) {
      console.error('Error getting payment:', error);
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Case methods
  const createCase = async (caseId, title, description) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await ContractService.createCase(caseId, title, description);
      return result;
    } catch (error) {
      console.error('Error creating case:', error);
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getCaseInfo = async (caseId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await ContractService.getCaseInfo(caseId);
      return result;
    } catch (error) {
      console.error('Error getting case info:', error);
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getAllCaseIds = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await ContractService.getAllCaseIds();
      return result;
    } catch (error) {
      console.error('Error getting all case IDs:', error);
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getActiveCaseIds = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await ContractService.getActiveCaseIds();
      return result;
    } catch (error) {
      console.error('Error getting active case IDs:', error);
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    isInitialized,
    isLoading,
    error,
    account,
    balance,
    networkId,
    initialize,
    disconnect,
    createWitness,
    getWitnessInfo,
    submitEvidence,
    getEvidence,
    createProposal,
    castVote,
    getProposal,
    createPayment,
    processPayment,
    getPayment,
    createCase,
    getCaseInfo,
    getAllCaseIds,
    getActiveCaseIds,
  };

  return (
    <BlockchainContext.Provider value={value}>
      {children}
    </BlockchainContext.Provider>
  );
}; 