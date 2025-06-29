// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../interfaces/IExpertDAO.sol";

/**
 * @title ExpertDAO
 * @dev Implementation of the Expert DAO contract
 */
contract ExpertDAO is AccessControl, IExpertDAO {
    using Counters for Counters.Counter;
    
    bytes32 public constant EXPERT_ROLE = keccak256("EXPERT_ROLE");
    bytes32 public constant JUDGE_ROLE = keccak256("JUDGE_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    
    Counters.Counter private _proposalIdCounter;
    
    // Mapping from proposal ID to proposal information
    mapping(uint256 => Proposal) private _proposals;
    
    // Mapping from case ID to proposal IDs
    mapping(string => uint256[]) private _caseProposals;
    
    // Mapping from proposal ID to voter address to whether they have voted
    mapping(uint256 => mapping(address => bool)) private _hasVoted;
    
    // Mapping from proposal ID to voter address to their vote
    mapping(uint256 => mapping(address => bool)) private _votes;
    
    /**
     * @dev Constructor
     */
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(JUDGE_ROLE, msg.sender);
    }
    
    /**
     * @dev See {IExpertDAO-createProposal}
     * Requirements:
     * - Caller must have EXPERT_ROLE, JUDGE_ROLE or ADMIN_ROLE
     * - Voting period must be greater than 0
     */
    function createProposal(
        string calldata title,
        string calldata description,
        string calldata caseId,
        string calldata evidenceURI,
        uint256 votingPeriod
    ) external override returns (uint256) {
        require(
            hasRole(EXPERT_ROLE, msg.sender) || 
            hasRole(JUDGE_ROLE, msg.sender) || 
            hasRole(ADMIN_ROLE, msg.sender),
            "ExpertDAO: caller is not authorized"
        );
        require(bytes(title).length > 0, "ExpertDAO: title cannot be empty");
        require(bytes(description).length > 0, "ExpertDAO: description cannot be empty");
        require(bytes(caseId).length > 0, "ExpertDAO: caseId cannot be empty");
        require(votingPeriod > 0, "ExpertDAO: votingPeriod must be greater than 0");
        
        uint256 proposalId = _proposalIdCounter.current();
        _proposalIdCounter.increment();
        
        uint256 endTime = block.timestamp + votingPeriod;
        
        _proposals[proposalId] = Proposal({
            id: proposalId,
            title: title,
            description: description,
            caseId: caseId,
            evidenceURI: evidenceURI,
            createdAt: block.timestamp,
            endTime: endTime,
            proposer: msg.sender,
            yesVotes: 0,
            noVotes: 0,
            executed: false,
            passed: false
        });
        
        _caseProposals[caseId].push(proposalId);
        
        emit ProposalCreated(proposalId, title, caseId, msg.sender, endTime);
        
        return proposalId;
    }
    
    /**
     * @dev See {IExpertDAO-castVote}
     * Requirements:
     * - Caller must have EXPERT_ROLE, JUDGE_ROLE or ADMIN_ROLE
     * - Proposal must exist
     * - Voting period must not have ended
     * - Caller must not have already voted on this proposal
     */
    function castVote(uint256 proposalId, bool support) external override {
        require(
            hasRole(EXPERT_ROLE, msg.sender) || 
            hasRole(JUDGE_ROLE, msg.sender) || 
            hasRole(ADMIN_ROLE, msg.sender),
            "ExpertDAO: caller is not authorized"
        );
        require(proposalId < _proposalIdCounter.current(), "ExpertDAO: proposal does not exist");
        require(block.timestamp <= _proposals[proposalId].endTime, "ExpertDAO: voting period has ended");
        require(!_hasVoted[proposalId][msg.sender], "ExpertDAO: caller has already voted");
        
        _hasVoted[proposalId][msg.sender] = true;
        _votes[proposalId][msg.sender] = support;
        
        if (support) {
            _proposals[proposalId].yesVotes += 1;
        } else {
            _proposals[proposalId].noVotes += 1;
        }
        
        emit VoteCast(proposalId, msg.sender, support, 1);
    }
    
    /**
     * @dev See {IExpertDAO-executeProposal}
     * Requirements:
     * - Proposal must exist
     * - Voting period must have ended
     * - Proposal must not have been executed already
     */
    function executeProposal(uint256 proposalId) external override {
        require(proposalId < _proposalIdCounter.current(), "ExpertDAO: proposal does not exist");
        require(block.timestamp > _proposals[proposalId].endTime, "ExpertDAO: voting period has not ended");
        require(!_proposals[proposalId].executed, "ExpertDAO: proposal already executed");
        
        Proposal storage proposal = _proposals[proposalId];
        
        // Determine if the proposal passed
        bool passed = proposal.yesVotes > proposal.noVotes;
        
        proposal.executed = true;
        proposal.passed = passed;
        
        emit ProposalExecuted(proposalId, passed);
    }
    
    /**
     * @dev See {IExpertDAO-getProposal}
     */
    function getProposal(uint256 proposalId) external view override returns (Proposal memory) {
        require(proposalId < _proposalIdCounter.current(), "ExpertDAO: proposal does not exist");
        return _proposals[proposalId];
    }
    
    /**
     * @dev See {IExpertDAO-getProposalIdsByCaseId}
     */
    function getProposalIdsByCaseId(string calldata caseId) external view override returns (uint256[] memory) {
        return _caseProposals[caseId];
    }
    
    /**
     * @dev See {IExpertDAO-hasVoted}
     */
    function hasVoted(uint256 proposalId, address voter) external view override returns (bool) {
        require(proposalId < _proposalIdCounter.current(), "ExpertDAO: proposal does not exist");
        return _hasVoted[proposalId][voter];
    }
    
    /**
     * @dev Gets the vote cast by a voter on a proposal
     * @param proposalId The ID of the proposal
     * @param voter The address of the voter
     * @return Whether the voter supported the proposal
     * Requirements:
     * - Proposal must exist
     * - Voter must have voted on the proposal
     */
    function getVote(uint256 proposalId, address voter) external view returns (bool) {
        require(proposalId < _proposalIdCounter.current(), "ExpertDAO: proposal does not exist");
        require(_hasVoted[proposalId][voter], "ExpertDAO: voter has not voted");
        return _votes[proposalId][voter];
    }
    
    /**
     * @dev Grants expert role to an address
     * @param account Address to grant the role to
     * Requirements:
     * - Caller must have ADMIN_ROLE or JUDGE_ROLE
     */
    function grantExpertRole(address account) external {
        require(
            hasRole(ADMIN_ROLE, msg.sender) || 
            hasRole(JUDGE_ROLE, msg.sender),
            "ExpertDAO: caller is not authorized"
        );
        _grantRole(EXPERT_ROLE, account);
    }
} 