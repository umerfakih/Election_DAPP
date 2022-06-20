// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Voting{
    struct candidate{
        uint id;
        string name;
        uint votecount;
    }

    mapping(uint => candidate) public candidates;

    address payable public owner;

    uint public candidatesCount;

    IERC20 public DigitalRupee;

    uint public commit;

    mapping (address => bool) public voters;

    event Vote(address indexed candidates,uint ammount);
    event WithdrawAll(uint ammount);

    constructor(address token, uint _commit){
        owner = payable(msg.sender);
        DigitalRupee = IERC20(token);
        commit = _commit;
        addCandidate("BJP");
        addCandidate("NCP");

    }

    function addCandidate(string memory _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = candidate(candidatesCount,_name,0);

    }

    function vote(uint _CandidateId) public{
        require(!voters[msg.sender]);
        require(DigitalRupee.balanceOf(msg.sender) >=1 );
        DigitalRupee.transferFrom(msg.sender,address(this),commit);
        require(_CandidateId>0 && _CandidateId<=candidatesCount);
        voters[msg.sender] = true;
        candidates[_CandidateId].votecount ++;
        emit Vote(msg.sender,commit);
    }

    function withdrawall() external onlyOwner{
        uint256 INR = DigitalRupee.balanceOf(address(this));
        DigitalRupee.transfer(msg.sender,INR);
        emit WithdrawAll(INR);
        selfdestruct(owner);
    }

    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }
}