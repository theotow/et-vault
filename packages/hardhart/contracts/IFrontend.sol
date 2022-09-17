// SPDX-License-Identifier: ISC
pragma solidity ^0.8.9;
pragma abicoder v1;

interface IFrontend {
    function withdrawNative(address _to, uint _value, address _vault, address _txSender) external;
    function getOwnerOfVault(address _vault) external view returns(address);
}