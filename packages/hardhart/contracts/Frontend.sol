// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./Structs.sol";
import "hardhat/console.sol";

contract Frontend {
    mapping(address => SharedStructs.Testimony) public testimonies;

    constructor() {}

    function iamAlive() public {

    }

    function withdraw() public {
    }

    function setup(SharedStructs.Inheritor[] memory _inheritors) public {
        address sender = msg.sender;
        SharedStructs.Testimony storage testimony = testimonies[msg.sender];

        testimony.id = 1;
        testimony.owner = sender;

        for (uint i=0; i< _inheritors.length; i++) {
            testimony.inheritors.push(_inheritors[i]);
        }
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
