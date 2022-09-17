// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

library SharedStructs {
    struct Testimony {
        address owner;
        Inheritor[] inheritors;
        uint lastAlive;
        uint reportTime;
    }

    struct Inheritor {
        address inheritor;
        uint share;
    }
}