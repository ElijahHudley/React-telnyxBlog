var BlogServer = (function() {

// **GET** `/posts` *List all blog posts*
// **GET** `/posts/{id}` *View single blog post*
// **GET** `/posts/{id}/comments` *List all comments for single blog post*

// **POST** /posts/{id}/comments` *Add comment to single blog post*
// **PUT** `/comments/{id}` *Update single comment*
var method = 'GET';
var headers = new Headers();
var options = {method: method, headers: headers, mode: 'cors', cache: 'default' };

  var getAllPosts = function() {
    console.log('getAllPosts');
    var url = 'http://localhost:9001/posts/';
    return fetch(url, options).then(response => response.text());
  }

  var getAllComments = function() {
    console.log('getAllComments');
    var url = 'http://localhost:9001/comments';
    return fetch(url, options).then(response => response.text());
  }

  var getPostByID = function(id) {
    console.log('getPostByID');
    var url = 'http://localhost:9001/posts/' + id;
    return fetch(url, options).then(response => response.text());
  }

  var getCommentsByPostID = function(postID) {
    console.log('getCommentsByPostID');
    method = 'GET';
    var url = 'http://localhost:9001/posts/'+ postID +'/comments';
    return fetch(url, options).then(response => response.text());
  }

  var PostCommentsByPostID = function(postID, data) {
    method = 'POST';
    console.log('PostCommentsByPostID', method, options);
    var url = 'http://localhost:9001/posts/' + postID + '/comments';

    var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(data));

    return fetch(url, options).then(response => response.text());
  }

  var UpdateCommentsByID = function(id,data) {
    console.log('UpdateCommentsByID');
    method = 'PUT';
    var url = 'http://localhost:9001/comments/' + id;
    return fetch(url, options).then(response => response.text());
  }


  return {
      getAllPosts: getAllPosts,
      getAllComments: getAllComments,
      getPostByID: getPostByID,
      getCommentsByPostID: getCommentsByPostID,
      PostCommentsByPostID: PostCommentsByPostID,
      UpdateCommentsByID: UpdateCommentsByID,

  };
})();

module.exports = BlogServer;
