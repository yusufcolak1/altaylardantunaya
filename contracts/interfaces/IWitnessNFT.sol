// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IWitnessNFT
 * @dev Interface for the Witness NFT contract
 */
interface IWitnessNFT {
    /**
     * @dev Witness information structure
     */
    struct WitnessInfo {
        string name; // Encrypted name of the witness
        string caseId; // Case identifier
        string metadataURI; // URI to the metadata (stored on IPFS)
        uint256 createdAt; // Timestamp when the witness was created
        address authorizedJudge; // Address of the authorized judge
        bool isActive; // Whether the witness is active
    }

    /**
     * @dev Emitted when a new witness NFT is minted
     */
    event WitnessCreated(uint256 indexed tokenId, string caseId, address indexed authorizedJudge);

    /**
     * @dev Emitted when a witness status is updated
     */
    event WitnessStatusUpdated(uint256 indexed tokenId, bool isActive);

    /**
     * @dev Emitted when witness metadata is updated
     */
    event WitnessMetadataUpdated(uint256 indexed tokenId, string metadataURI);

    /**
     * @dev Creates a new witness NFT
     * @param to Address to mint the NFT to
     * @param name Encrypted name of the witness
     * @param caseId Case identifier
     * @param metadataURI URI to the metadata
     * @param authorizedJudge Address of the authorized judge
     * @return tokenId The ID of the minted NFT
     */
    function createWitness(
        address to,
        string calldata name,
        string calldata caseId,
        string calldata metadataURI,
        address authorizedJudge
    ) external returns (uint256 tokenId);

    /**
     * @dev Updates the witness status
     * @param tokenId The ID of the witness NFT
     * @param isActive New status of the witness
     */
    function updateWitnessStatus(uint256 tokenId, bool isActive) external;

    /**
     * @dev Updates the witness metadata
     * @param tokenId The ID of the witness NFT
     * @param metadataURI New URI to the metadata
     */
    function updateWitnessMetadata(uint256 tokenId, string calldata metadataURI) external;

    /**
     * @dev Gets information about a witness
     * @param tokenId The ID of the witness NFT
     * @return Witness information
     */
    function getWitnessInfo(uint256 tokenId) external view returns (WitnessInfo memory);
} 