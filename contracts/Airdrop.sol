// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Airdrop {
    mapping(address => uint) public user;

    address payable public  owner;

    uint256 public only1;

    IERC20 public DigitalRupee;

    mapping(address => bool) public alreadyClaimed;

    event Claim(address indexed user,uint amount);

    event WithdrawAll(uint256 ammount);

    constructor(address _token,uint256 _only1){
        owner = payable(msg.sender);
        only1 = _only1;
        DigitalRupee = IERC20(_token);
    }

    function claim () external {
        require(!alreadyClaimed[msg.sender]);
        DigitalRupee.transfer(msg.sender,only1);
        alreadyClaimed[msg.sender] = true;
        emit Claim(msg.sender, only1);
    }

    function withdrawall() external onlyOwner{
        uint256 remainingAmount = DigitalRupee.balanceOf(address(this));
        DigitalRupee.transfer(msg.sender,remainingAmount);
        emit WithdrawAll(remainingAmount);
        selfdestruct(owner);
    }

    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }

}