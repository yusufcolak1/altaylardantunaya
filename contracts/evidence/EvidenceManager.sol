// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../interfaces/IEvidenceManager.sol";

/**
 * @title EvidenceManager
 * @dev Implementation of the Evidence Manager contract
 */
contract EvidenceManager is AccessControl, IEvidenceManager {
    using Counters for Counters.Counter;
    
    bytes32 public constant JUDGE_ROLE = keccak256("JUDGE_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant SUBMITTER_ROLE = keccak256("SUBMITTER_ROLE");
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");
    
    Counters.Counter private _evidenceIdCounter;
    
    // Mapping from evidence ID to evidence information
    mapping(uint256 => Evidence) private _evidences;
    
    // Mapping from case ID to evidence IDs
    mapping(string => uint256[]) private _caseEvidences;
    
    // Mapping from submitter address to evidence IDs
    mapping(address => uint256[]) private _submitterEvidences;
    
    /**
     * @dev Constructor
     */
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(JUDGE_ROLE, msg.sender);
        _grantRole(VERIFIER_ROLE, msg.sender);
    }
    
    /**
     * @dev See {IEvidenceManager-submitEvidence}
     * Requirements:
     * - Caller must have SUBMITTER_ROLE or ADMIN_ROLE or JUDGE_ROLE
     */
    function submitEvidence(
        string calldata caseId,
        string calldata evidenceHash,
        string calldata metadataURI
    ) external override returns (uint256) {
        require(
            hasRole(SUBMITTER_ROLE, msg.sender) || 
            hasRole(ADMIN_ROLE, msg.sender) || 
            hasRole(JUDGE_ROLE, msg.sender),
            "EvidenceManager: caller is not authorized"
        );
        require(bytes(caseId).length > 0, "EvidenceManager: caseId cannot be empty");
        require(bytes(evidenceHash).length > 0, "EvidenceManager: evidenceHash cannot be empty");
        require(bytes(metadataURI).length > 0, "EvidenceManager: metadataURI cannot be empty");
        
        uint256 evidenceId = _evidenceIdCounter.current();
        _evidenceIdCounter.increment();
        
        _evidences[evidenceId] = Evidence({
            caseId: caseId,
            evidenceHash: evidenceHash,
            metadataURI: metadataURI,
            timestamp: block.timestamp,
            submitter: msg.sender,
            isVerified: false,
            verifier: address(0),
            verificationTime: 0
        });
        
        _caseEvidences[caseId].push(evidenceId);
        _submitterEvidences[msg.sender].push(evidenceId);
        
        emit EvidenceSubmitted(evidenceId, caseId, evidenceHash, msg.sender);
        
        return evidenceId;
    }
    
    /**
     * @dev See {IEvidenceManager-verifyEvidence}
     * Requirements:
     * - Caller must have VERIFIER_ROLE or ADMIN_ROLE or JUDGE_ROLE
     * - Evidence must not be already verified
     */
    function verifyEvidence(uint256 evidenceId) external override {
        require(
            hasRole(VERIFIER_ROLE, msg.sender) || 
            hasRole(ADMIN_ROLE, msg.sender) || 
            hasRole(JUDGE_ROLE, msg.sender),
            "EvidenceManager: caller is not authorized"
        );
        require(evidenceId < _evidenceIdCounter.current(), "EvidenceManager: evidence does not exist");
        require(!_evidences[evidenceId].isVerified, "EvidenceManager: evidence already verified");
        
        _evidences[evidenceId].isVerified = true;
        _evidences[evidenceId].verifier = msg.sender;
        _evidences[evidenceId].verificationTime = block.timestamp;
        
        emit EvidenceVerified(evidenceId, msg.sender, block.timestamp);
    }
    
    /**
     * @dev See {IEvidenceManager-getEvidence}
     */
    function getEvidence(uint256 evidenceId) external view override returns (Evidence memory) {
        require(evidenceId < _evidenceIdCounter.current(), "EvidenceManager: evidence does not exist");
        return _evidences[evidenceId];
    }
    
    /**
     * @dev See {IEvidenceManager-getEvidenceIdsByCaseId}
     */
    function getEvidenceIdsByCaseId(string calldata caseId) external view override returns (uint256[] memory) {
        return _caseEvidences[caseId];
    }
    
    /**
     * @dev Gets all evidence IDs for a submitter
     * @param submitter Address of the submitter
     * @return Array of evidence IDs
     */
    function getEvidenceIdsBySubmitter(address submitter) external view returns (uint256[] memory) {
        return _submitterEvidences[submitter];
    }
    
    /**
     * @dev Grants submitter role to an address
     * @param account Address to grant the role to
     * Requirements:
     * - Caller must have ADMIN_ROLE
     */
    function grantSubmitterRole(address account) external onlyRole(ADMIN_ROLE) {
        _grantRole(SUBMITTER_ROLE, account);
    }
    
    /**
     * @dev Grants verifier role to an address
     * @param account Address to grant the role to
     * Requirements:
     * - Caller must have ADMIN_ROLE
     */
    function grantVerifierRole(address account) external onlyRole(ADMIN_ROLE) {
        _grantRole(VERIFIER_ROLE, account);
    }
} 