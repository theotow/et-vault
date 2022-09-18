// SPDX-License-Identifier: ISC
pragma solidity ^0.8.9;
pragma abicoder v1;

import "@gnosis.pm/zodiac/contracts/interfaces/IAvatar.sol";
import "@gnosis.pm/zodiac/contracts/guard/BaseGuard.sol";
import "./IFrontend.sol";

contract Guard is BaseGuard {
    address public FRONTEND;
    bytes public constant SIG_GUARD_REMOVE = '0xe19a9dd90000000000000000000000000000000000000000000000000000000000000000';

    constructor(address _frontend) {
        FRONTEND = _frontend;
    }

    function checkTransaction(
        address to,
        uint256 value,
        bytes memory data,
        Enum.Operation operation,
        uint256 safeTxGas,
        uint256 baseGas,
        uint256 gasPrice,
        address gasToken,
        address payable refundReceiver,
        bytes memory signatures,
        address msgSender
    ) external override {
        address gnosisSafeAddress = msg.sender;
        address owner = IFrontend(FRONTEND).getOwnerOfVault(gnosisSafeAddress);
        if (owner == address(0)) {
            return; // the frontend was not jet initialized
        }

        require((keccak256(abi.encodePacked(data)) == keccak256(abi.encodePacked(SIG_GUARD_REMOVE)) && msgSender != owner), "you are not allowed to remove the quard");
        IFrontend(FRONTEND).withdrawNative(to, value, gnosisSafeAddress, msgSender);
    }

    function checkAfterExecution(bytes32 txHash, bool success) external override {

    }

    // solhint-disallow-next-line payable-fallback
    fallback() external {
        // We don't revert on fallback to avoid issues in case of a Safe upgrade
        // E.g. The expected check method might change and then the Safe would be locked.
    }
}