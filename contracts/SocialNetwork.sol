// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SocialNetwork {
   uint postCount = 0;
   string public name;
   mapping(uint => Post) public posts;
   struct Post{
      uint id;
      string content;
      uint tipAmount;
      address author;
   }

   constructor() public {
      name ="Chalie";
   }

   function createPost(string memory _content) public{
      postCount ++;
      posts[postCount] = Post(postCount,_content,0,msg.sender);

   }
}
