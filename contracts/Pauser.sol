// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.8;

contract Pauser {

    address public immutable owner;
    bool public isPaused = false;

    constructor() {
        owner = msg.sender;
    }

    function pause() public onlyOnwer onlyNotPaused {
        isPaused = true;
    }

    function unpause() public onlyOnwer onlyPaused {
        isPaused = false;
    }

    modifier onlyOnwer {
        require(msg.sender == owner);
        _;
    }

    modifier onlyPaused {
        require(isPaused);
        _;
    }

    modifier onlyNotPaused {
        require(!isPaused);
        _;
    }
}
