// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./Structs.sol";
import "hardhat/console.sol";

contract Frontend {
    mapping(address => SharedStructs.Testimony) public testimonies;
    mapping(address => address) public vaultAddressToOwnerAddress;

    constructor() {}

    function iamAlive() public {
        require(testimonies[msg.sender].owner == address(0), "you dont have a vault");
        testimonies[msg.sender].lastAlive = block.timestamp;
    }

    function withdraw(address _to, address _vault) public {
        require(vaultAddressToOwnerAddress[_vault] == address(0), "no testimoney found");
        address owner = vaultAddressToOwnerAddress[_vault];
        if (_to != owner) {
            if (ownerIsAlive(owner, block.timestamp)) {
                revert("you bad boy");
            }
        } else {
            // if its the owner
            testimonies[msg.sender].lastAlive = block.timestamp;
        }
    }

    function ownerIsAlive(address _owner, uint _timestamp) public view returns(bool) {
        uint deadTimestamp = (testimonies[_owner].lastAlive + testimonies[_owner].reportTime);
        return (_timestamp  < deadTimestamp);
    }

    function setup(SharedStructs.Inheritor[] memory _inheritors, uint _reportTime, address _vaultAddress) public {
        // TODO: check that setup was not called already
        address sender = msg.sender;
        SharedStructs.Testimony storage testimony = testimonies[msg.sender];

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
        uint count = testimonies[owner].inheritors.length;
        SharedStructs.Inheritor[] memory planets = new SharedStructs.Inheritor[](count);
        for (uint j = 0; j < count; j++) {
            SharedStructs.Inheritor memory planet = testimonies[owner].inheritors[j];
            planets[j] = planet;
        }
        return planets;
    }
}
