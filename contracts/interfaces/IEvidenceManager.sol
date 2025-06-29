// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IEvidenceManager
 * @dev Interface for the Evidence Manager contract
 */
interface IEvidenceManager {
    /**
     * @dev Evidence information structure
     */
    struct Evidence {
        string caseId; // Case identifier
        string evidenceHash; // Hash of the evidence content
        string metadataURI; // URI to the metadata (stored on IPFS)
        uint256 timestamp; // Timestamp when the evidence was submitted
        address submitter; // Address of the submitter
        bool isVerified; // Whether the evidence has been verified
        address verifier; // Address of the verifier (if verified)
        uint256 verificationTime; // Timestamp when the evidence was verified
    }

    /**
     * @dev Emitted when a new evidence is submitted
     */
    event EvidenceSubmitted(
        uint256 indexed evidenceId,
        string caseId,
        string evidenceHash,
        address indexed submitter
    );

    /**
     * @dev Emitted when an evidence is verified
     */
    event EvidenceVerified(
        uint256 indexed evidenceId,
        address indexed verifier,
        uint256 verificationTime
    );

    /**
     * @dev Submits a new evidence
     * @param caseId Case identifier
     * @param evidenceHash Hash of the evidence content
     * @param metadataURI URI to the metadata
     * @return evidenceId The ID of the submitted evidence
     */
    function submitEvidence(
        string calldata caseId,
        string calldata evidenceHash,
        string calldata metadataURI
    ) external returns (uint256 evidenceId);

    /**
     * @dev Verifies an evidence
     * @param evidenceId The ID of the evidence
     */
    function verifyEvidence(uint256 evidenceId) external;

    /**
     * @dev Gets information about an evidence
     * @param evidenceId The ID of the evidence
     * @return Evidence information
     */
    function getEvidence(uint256 evidenceId) external view returns (Evidence memory);

    /**
     * @dev Gets all evidence IDs for a case
     * @param caseId Case identifier
     * @return Array of evidence IDs
     */
    function getEvidenceIdsByCaseId(string calldata caseId) external view returns (uint256[] memory);
} 