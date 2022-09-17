// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

library SharedStructs {
    struct Testimony {
        address owner;
        Inheritor[] inheritors;
        uint lastAlive;
        uint reportTime;
        uint deathBalance;
        bool isDead;
    }

    struct Inheritor {
        address inheritor;
        uint share;
        uint balanceWithdrawn;
    }
}