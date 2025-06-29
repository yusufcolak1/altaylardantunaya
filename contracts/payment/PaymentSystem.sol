// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../interfaces/IPaymentSystem.sol";

/**
 * @title PaymentSystem
 * @dev Implementation of the Payment System contract
 */
contract PaymentSystem is AccessControl, ReentrancyGuard, IPaymentSystem {
    using Counters for Counters.Counter;
    
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant JUDGE_ROLE = keccak256("JUDGE_ROLE");
    bytes32 public constant PAYMENT_MANAGER_ROLE = keccak256("PAYMENT_MANAGER_ROLE");
    
    Counters.Counter private _paymentIdCounter;
    
    // Mapping from payment ID to payment information
    mapping(uint256 => Payment) private _payments;
    
    // Mapping from case ID to payment IDs
    mapping(string => uint256[]) private _casePayments;
    
    // Mapping from recipient address to payment IDs
    mapping(address => uint256[]) private _recipientPayments;
    
    /**
     * @dev Constructor
     */
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(JUDGE_ROLE, msg.sender);
        _grantRole(PAYMENT_MANAGER_ROLE, msg.sender);
    }
    
    /**
     * @dev See {IPaymentSystem-createPayment}
     * Requirements:
     * - Caller must have PAYMENT_MANAGER_ROLE, JUDGE_ROLE or ADMIN_ROLE
     */
    function createPayment(
        string calldata caseId,
        string calldata paymentType,
        address recipient,
        uint256 amount
    ) external override returns (uint256) {
        require(
            hasRole(PAYMENT_MANAGER_ROLE, msg.sender) || 
            hasRole(JUDGE_ROLE, msg.sender) || 
            hasRole(ADMIN_ROLE, msg.sender),
            "PaymentSystem: caller is not authorized"
        );
        require(bytes(caseId).length > 0, "PaymentSystem: caseId cannot be empty");
        require(bytes(paymentType).length > 0, "PaymentSystem: paymentType cannot be empty");
        require(recipient != address(0), "PaymentSystem: recipient cannot be zero address");
        require(amount > 0, "PaymentSystem: amount must be greater than 0");
        
        uint256 paymentId = _paymentIdCounter.current();
        _paymentIdCounter.increment();
        
        _payments[paymentId] = Payment({
            id: paymentId,
            caseId: caseId,
            paymentType: paymentType,
            recipient: recipient,
            payer: address(0),
            amount: amount,
            createdAt: block.timestamp,
            isPaid: false,
            paidAt: 0
        });
        
        _casePayments[caseId].push(paymentId);
        _recipientPayments[recipient].push(paymentId);
        
        emit PaymentCreated(paymentId, caseId, recipient, amount);
        
        return paymentId;
    }
    
    /**
     * @dev See {IPaymentSystem-processPayment}
     * Requirements:
     * - Payment must exist
     * - Payment must not be already paid
     * - Sent value must match the payment amount
     */
    function processPayment(uint256 paymentId) external payable override nonReentrant {
        require(paymentId < _paymentIdCounter.current(), "PaymentSystem: payment does not exist");
        require(!_payments[paymentId].isPaid, "PaymentSystem: payment already processed");
        require(msg.value == _payments[paymentId].amount, "PaymentSystem: incorrect payment amount");
        
        Payment storage payment = _payments[paymentId];
        payment.isPaid = true;
        payment.paidAt = block.timestamp;
        payment.payer = msg.sender;
        
        // Transfer the payment to the recipient
        (bool success, ) = payment.recipient.call{value: msg.value}("");
        require(success, "PaymentSystem: transfer failed");
        
        emit PaymentProcessed(paymentId, msg.sender, payment.recipient, msg.value, block.timestamp);
    }
    
    /**
     * @dev See {IPaymentSystem-getPayment}
     */
    function getPayment(uint256 paymentId) external view override returns (Payment memory) {
        require(paymentId < _paymentIdCounter.current(), "PaymentSystem: payment does not exist");
        return _payments[paymentId];
    }
    
    /**
     * @dev See {IPaymentSystem-getPaymentIdsByCaseId}
     */
    function getPaymentIdsByCaseId(string calldata caseId) external view override returns (uint256[] memory) {
        return _casePayments[caseId];
    }
    
    /**
     * @dev See {IPaymentSystem-getPaymentIdsByRecipient}
     */
    function getPaymentIdsByRecipient(address recipient) external view override returns (uint256[] memory) {
        return _recipientPayments[recipient];
    }
    
    /**
     * @dev See {IPaymentSystem-withdraw}
     * Requirements:
     * - Caller must have ADMIN_ROLE
     * - Contract must have sufficient balance
     */
    function withdraw(uint256 amount) external override onlyRole(ADMIN_ROLE) nonReentrant {
        require(amount > 0, "PaymentSystem: amount must be greater than 0");
        require(amount <= address(this).balance, "PaymentSystem: insufficient balance");
        
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "PaymentSystem: transfer failed");
    }
    
    /**
     * @dev Grants payment manager role to an address
     * @param account Address to grant the role to
     * Requirements:
     * - Caller must have ADMIN_ROLE
     */
    function grantPaymentManagerRole(address account) external onlyRole(ADMIN_ROLE) {
        _grantRole(PAYMENT_MANAGER_ROLE, account);
    }
    
    /**
     * @dev Fallback function to receive Ether
     */
    receive() external payable {}
} 