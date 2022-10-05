// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SocialNetwork {
   uint public postCount = 0;
   string public name;
   address public owner;
   mapping(uint => Post) public posts;
   struct Post{
      uint id;
      string content;
      uint tipAmount;
      address payable author;
   }
   event PostCreated(uint id,string content,uint tipAmount,address payable author);
   event PostTipped(uint id,string content,uint tipAmount,address payable author);
   constructor() {
      name ="Chalie";
   }

   function createPost(string memory _content) public {
      require(bytes(_content).length > 0,"content should not be blank");
      postCount ++;
      posts[postCount] = Post(postCount,_content,0,payable(msg.sender));
      emit PostCreated(postCount,_content,0, payable(msg.sender));
   }

   function tipAmount(uint _id)public payable{
      require(_id > 0 && _id <= postCount );
      Post memory _post = posts[_id];
      address payable _author = _post.author;

      _author.transfer(msg.value);

      _post.tipAmount = _post.tipAmount + msg.value ;
      posts[_id]= _post;
      emit PostTipped(postCount,_post.content,_post.tipAmount,_author);
   }

}
