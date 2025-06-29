// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../interfaces/IWitnessNFT.sol";

/**
 * @title WitnessNFT
 * @dev Implementation of the Witness NFT contract
 */
contract WitnessNFT is ERC721URIStorage, AccessControl, IWitnessNFT {
    using Counters for Counters.Counter;
    
    bytes32 public constant JUDGE_ROLE = keccak256("JUDGE_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    
    Counters.Counter private _tokenIdCounter;
    
    // Mapping from token ID to witness information
    mapping(uint256 => WitnessInfo) private _witnessInfo;
    
    // Mapping from case ID to token IDs
    mapping(string => uint256[]) private _caseWitnesses;
    
    /**
     * @dev Constructor
     * @param name Name of the NFT collection
     * @param symbol Symbol of the NFT collection
     */
    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }
    
    /**
     * @dev See {IWitnessNFT-createWitness}
     * Requirements:
     * - Caller must have JUDGE_ROLE or ADMIN_ROLE
     */
    function createWitness(
        address to,
        string calldata name,
        string calldata caseId,
        string calldata metadataURI,
        address authorizedJudge
    ) external override onlyRole(JUDGE_ROLE) returns (uint256) {
        require(to != address(0), "WitnessNFT: mint to the zero address");
        require(bytes(name).length > 0, "WitnessNFT: name cannot be empty");
        require(bytes(caseId).length > 0, "WitnessNFT: caseId cannot be empty");
        require(bytes(metadataURI).length > 0, "WitnessNFT: metadataURI cannot be empty");
        require(authorizedJudge != address(0), "WitnessNFT: authorizedJudge cannot be zero address");
        
        // Grant JUDGE_ROLE to authorizedJudge if they don't have it
        if (!hasRole(JUDGE_ROLE, authorizedJudge)) {
            _grantRole(JUDGE_ROLE, authorizedJudge);
        }
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, metadataURI);
        
        _witnessInfo[tokenId] = WitnessInfo({
            name: name,
            caseId: caseId,
            metadataURI: metadataURI,
            createdAt: block.timestamp,
            authorizedJudge: authorizedJudge,
            isActive: true
        });
        
        _caseWitnesses[caseId].push(tokenId);
        
        emit WitnessCreated(tokenId, caseId, authorizedJudge);
        
        return tokenId;
    }
    
    /**
     * @dev See {IWitnessNFT-updateWitnessStatus}
     * Requirements:
     * - Caller must be the authorized judge for the witness or have ADMIN_ROLE
     */
    function updateWitnessStatus(uint256 tokenId, bool isActive) external override {
        require(_exists(tokenId), "WitnessNFT: token does not exist");
        require(
            hasRole(ADMIN_ROLE, msg.sender) || 
            _witnessInfo[tokenId].authorizedJudge == msg.sender,
            "WitnessNFT: caller is not authorized"
        );
        
        _witnessInfo[tokenId].isActive = isActive;
        
        emit WitnessStatusUpdated(tokenId, isActive);
    }
    
    /**
     * @dev See {IWitnessNFT-updateWitnessMetadata}
     * Requirements:
     * - Caller must be the authorized judge for the witness or have ADMIN_ROLE
     */
    function updateWitnessMetadata(uint256 tokenId, string calldata metadataURI) external override {
        require(_exists(tokenId), "WitnessNFT: token does not exist");
        require(
            hasRole(ADMIN_ROLE, msg.sender) || 
            _witnessInfo[tokenId].authorizedJudge == msg.sender,
            "WitnessNFT: caller is not authorized"
        );
        require(bytes(metadataURI).length > 0, "WitnessNFT: metadataURI cannot be empty");
        
        _witnessInfo[tokenId].metadataURI = metadataURI;
        _setTokenURI(tokenId, metadataURI);
        
        emit WitnessMetadataUpdated(tokenId, metadataURI);
    }
    
    /**
     * @dev See {IWitnessNFT-getWitnessInfo}
     */
    function getWitnessInfo(uint256 tokenId) external view override returns (WitnessInfo memory) {
        require(_exists(tokenId), "WitnessNFT: token does not exist");
        return _witnessInfo[tokenId];
    }
    
    /**
     * @dev Gets all witness token IDs for a case
     * @param caseId Case identifier
     * @return Array of witness token IDs
     */
    function getWitnessIdsByCaseId(string calldata caseId) external view returns (uint256[] memory) {
        return _caseWitnesses[caseId];
    }
    
    /**
     * @dev See {IERC165-supportsInterface}
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage, AccessControl)
        returns (bool)
    {
        return
            interfaceId == type(IWitnessNFT).interfaceId ||
            super.supportsInterface(interfaceId);
    }
} 