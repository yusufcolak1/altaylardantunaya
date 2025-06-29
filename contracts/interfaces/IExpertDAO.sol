// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IExpertDAO
 * @dev Interface for the Expert DAO contract
 */
interface IExpertDAO {
    /**
     * @dev Proposal structure
     */
    struct Proposal {
        uint256 id; // Proposal ID
        string title; // Proposal title
        string description; // Proposal description
        string caseId; // Related case ID
        string evidenceURI; // URI to the evidence or document
        uint256 createdAt; // Timestamp when the proposal was created
        uint256 endTime; // Timestamp when voting ends
        address proposer; // Address of the proposer
        uint256 yesVotes; // Number of yes votes
        uint256 noVotes; // Number of no votes
        bool executed; // Whether the proposal has been executed
        bool passed; // Whether the proposal passed
    }

    /**
     * @dev Emitted when a new proposal is created
     */
    event ProposalCreated(
        uint256 indexed proposalId,
        string title,
        string caseId,
        address indexed proposer,
        uint256 endTime
    );

    /**
     * @dev Emitted when a vote is cast
     */
    event VoteCast(
        uint256 indexed proposalId,
        address indexed voter,
        bool support,
        uint256 weight
    );

    /**
     * @dev Emitted when a proposal is executed
     */
    event ProposalExecuted(uint256 indexed proposalId, bool passed);

    /**
     * @dev Creates a new proposal
     * @param title Proposal title
     * @param description Proposal description
     * @param caseId Related case ID
     * @param evidenceURI URI to the evidence or document
     * @param votingPeriod Voting period in seconds
     * @return proposalId The ID of the created proposal
     */
    function createProposal(
        string calldata title,
        string calldata description,
        string calldata caseId,
        string calldata evidenceURI,
        uint256 votingPeriod
    ) external returns (uint256 proposalId);

    /**
     * @dev Casts a vote on a proposal
     * @param proposalId The ID of the proposal
     * @param support Whether to support the proposal
     */
    function castVote(uint256 proposalId, bool support) external;

    /**
     * @dev Executes a proposal after voting period has ended
     * @param proposalId The ID of the proposal
     */
    function executeProposal(uint256 proposalId) external;

    /**
     * @dev Gets information about a proposal
     * @param proposalId The ID of the proposal
     * @return Proposal information
     */
    function getProposal(uint256 proposalId) external view returns (Proposal memory);

    /**
     * @dev Gets all proposal IDs for a case
     * @param caseId Case identifier
     * @return Array of proposal IDs
     */
    function getProposalIdsByCaseId(string calldata caseId) external view returns (uint256[] memory);

    /**
     * @dev Checks if an address has voted on a proposal
     * @param proposalId The ID of the proposal
     * @param voter The address to check
     * @return Whether the address has voted on the proposal
     */
    function hasVoted(uint256 proposalId, address voter) external view returns (bool);
} 