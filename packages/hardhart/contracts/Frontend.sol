// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./Structs.sol";
import "hardhat/console.sol";
import "./IFrontend.sol";

contract Frontend is IFrontend {
    mapping(address => SharedStructs.Testimony) public ownerToTestemonies;
    mapping(address => address) public vaultAddressToOwnerAddress;

    constructor() {}

    function iamAlive() public {
        require(ownerToTestemonies[msg.sender].owner != address(0), "you dont have a vault");
        ownerToTestemonies[msg.sender].lastAlive = block.timestamp;
    }

    function withdrawNative(address _to, uint _value, address _vault, address _txSender) public {
        require(vaultAddressToOwnerAddress[_vault] != address(0), "no testimoney found");
        address owner = vaultAddressToOwnerAddress[_vault];
        if (_txSender != owner) {
            if (ownerIsAlive(owner, block.timestamp)) {
                revert("owner still alive");
            } else {
                SharedStructs.Testimony storage testimony = ownerToTestemonies[owner];
                if (!testimony.isDead) {
                    testimony.deathBalance = address(_vault).balance;
                    testimony.isDead = true;
                }
                for (uint i=0; i< testimony.inheritors.length; i++) {
                    if (testimony.inheritors[i].inheritor == _txSender) {
                        uint inheritageShare =  (testimony.deathBalance / 100) * testimony.inheritors[i].share;
                        uint newBalanceWithDrawn = testimony.inheritors[i].balanceWithdrawn + _value;
                        if (newBalanceWithDrawn > inheritageShare) {
                            revert("reached limit");
                        }
                        testimony.inheritors[i].balanceWithdrawn = newBalanceWithDrawn;
                    }
                }
            }
        } else {
            // if its the owner
            ownerToTestemonies[msg.sender].lastAlive = block.timestamp;
        }
    }

    function ownerIsAlive(address _owner, uint _timestamp) public view returns(bool) {
        uint deadTimestamp = (ownerToTestemonies[_owner].lastAlive + ownerToTestemonies[_owner].reportTime);
        return (_timestamp  < deadTimestamp);
    }

    function setup(SharedStructs.Inheritor[] memory _inheritors, uint _reportTime, address _vaultAddress) public {
        // TODO: check that setup was not called already
        address sender = msg.sender;
        SharedStructs.Testimony storage testimony = ownerToTestemonies[msg.sender];

        // testimoney
        testimony.owner = sender;
        testimony.lastAlive = block.timestamp;
        testimony.reportTime = _reportTime;
        for (uint i=0; i< _inheritors.length; i++) {
            testimony.inheritors.push(_inheritors[i]);
        }

        // vault to owner mapping
        vaultAddressToOwnerAddress[_vaultAddress] = sender;
    }

    function getter(address owner) public view returns (SharedStructs.Inheritor[] memory) {
        uint count = ownerToTestemonies[owner].inheritors.length;
        SharedStructs.Inheritor[] memory planets = new SharedStructs.Inheritor[](count);
        for (uint j = 0; j < count; j++) {
            SharedStructs.Inheritor memory planet = ownerToTestemonies[owner].inheritors[j];
            planets[j] = planet;
        }
        return planets;
    }

    function getOwnerOfVault(address _vault) public view returns(address) {
        return vaultAddressToOwnerAddress[_vault];
    }
}
