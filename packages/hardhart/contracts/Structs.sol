// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

library SharedStructs {
    struct Testimony {
        uint id;
        address owner;
        Inheritor[] inheritors;
    }

    struct Inheritor {
        address inheritor;
        uint share;
    }
}