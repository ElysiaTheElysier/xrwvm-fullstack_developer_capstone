const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({message: "Username and password are required"});
  }
  if (users.find((user) => user.username === username)) {
    return res.status(409).json({message: "Username already exists"});
  }
  users.push({username, password});
  return res.status(200).json({message: "Customer successfully registered. Now you can login"});
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  res.send(JSON.stringify({books}, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.json(books[isbn]);
  } else {
    res.status(404).json({message: "Book not found"});
  }
});
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const booksbyauthor = Object.entries(books).filter(([key, book]) => book.author === author).map(([isbn, book]) => ({isbn, ...book}));
  res.json({booksbyauthor});
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const booksbytitle = Object.entries(books).filter(([key, book]) => book.title === title).map(([isbn, book]) => ({isbn, ...book}));
  res.json({booksbytitle});
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.json(books[isbn].reviews);
  } else {
    res.status(404).json({message: "Book not found"});
  }
});


// Task 10, 11, 12, 13: Async/Await with Axios

// Get all books using async/await
const getAllBooks = async () => {
    try {
        const response = await axios.get('http://localhost:5000/');
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

// Get book details by ISBN using Promises
const getBookByISBN = (isbn) => {
    axios.get(`http://localhost:5000/isbn/${isbn}`)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });
};

// Get book details by Author using async/await
const getBookByAuthor = async (author) => {
    try {
        const response = await axios.get(`http://localhost:5000/author/${author}`);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

// Get book details by Title using async/await
const getBookByTitle = async (title) => {
    try {
        const response = await axios.get(`http://localhost:5000/title/${title}`);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

module.exports.general = public_users;
