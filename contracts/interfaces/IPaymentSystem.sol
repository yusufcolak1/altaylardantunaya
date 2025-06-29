// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IPaymentSystem
 * @dev Interface for the Payment System contract
 */
interface IPaymentSystem {
    /**
     * @dev Payment information structure
     */
    struct Payment {
        uint256 id; // Payment ID
        string caseId; // Related case ID
        string paymentType; // Type of payment (e.g., "Witness Fee", "Expert Fee")
        address recipient; // Address of the recipient
        address payer; // Address of the payer
        uint256 amount; // Amount of the payment
        uint256 createdAt; // Timestamp when the payment was created
        bool isPaid; // Whether the payment has been paid
        uint256 paidAt; // Timestamp when the payment was paid
    }

    /**
     * @dev Emitted when a new payment is created
     */
    event PaymentCreated(
        uint256 indexed paymentId,
        string caseId,
        address indexed recipient,
        uint256 amount
    );

    /**
     * @dev Emitted when a payment is processed
     */
    event PaymentProcessed(
        uint256 indexed paymentId,
        address indexed payer,
        address indexed recipient,
        uint256 amount,
        uint256 paidAt
    );

    /**
     * @dev Creates a new payment request
     * @param caseId Related case ID
     * @param paymentType Type of payment
     * @param recipient Address of the recipient
     * @param amount Amount of the payment
     * @return paymentId The ID of the created payment
     */
    function createPayment(
        string calldata caseId,
        string calldata paymentType,
        address recipient,
        uint256 amount
    ) external returns (uint256 paymentId);

    /**
     * @dev Processes a payment
     * @param paymentId The ID of the payment
     */
    function processPayment(uint256 paymentId) external payable;

    /**
     * @dev Gets information about a payment
     * @param paymentId The ID of the payment
     * @return Payment information
     */
    function getPayment(uint256 paymentId) external view returns (Payment memory);

    /**
     * @dev Gets all payment IDs for a case
     * @param caseId Case identifier
     * @return Array of payment IDs
     */
    function getPaymentIdsByCaseId(string calldata caseId) external view returns (uint256[] memory);

    /**
     * @dev Gets all payment IDs for a recipient
     * @param recipient Address of the recipient
     * @return Array of payment IDs
     */
    function getPaymentIdsByRecipient(address recipient) external view returns (uint256[] memory);

    /**
     * @dev Withdraws funds from the contract
     * @param amount Amount to withdraw
     */
    function withdraw(uint256 amount) external;
} 