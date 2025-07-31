const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


const getBooks = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(books); 
    } catch (err) {
      reject(err);
    }
  });
};

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (users.some(user => user.username === username)) {
    return res.status(409).json({ message: "User already exists" });
  }

  users.push({ username: username, password: password });
  return res.status(200).json({ message: "User successfully registered" });
  // return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  try {
    const allBooks = await getBooks(); 
    return res.status(200).send(JSON.stringify(allBooks, null, 4));
  } catch (err) {
    return res.status(500).json({ message: "Error fetching books" });
  }
}); 
// public_users.get('/',function (req, res) {
//   //Write your code here
//   return res.status(200).send(JSON.stringify(books, null, 4));
//   // return res.status(300).json({message: "Yet to be implemented"});
// });

// Get book details based on ISBN

// public_users.get('/isbn/:isbn', async function (req, res) {
//   const isbn = req.params.isbn;
//   try {
//     const allBooks = await getBooks();
//     const book = allBooks[isbn];
//     if (book) {
//       return res.status(200).json(book);
//     } else {
//       return res.status(404).json({ message: "Book not found" });
//     }
//   } catch (err) {
//     return res.status(500).json({ message: "Error fetching book by ISBN" });
//   }
// });

// public_users.get('/isbn/:isbn',function (req, res) {
//   //Write your code here
//   const isbn = req.params.isbn;
//   const book = books[isbn];

//   if (book) {
//     return res.status(200).json(book);
//   } else {
//     return res.status(404).json({ message: "Book not found" });
//   }
//   // return res.status(300).json({message: "Yet to be implemented"});
// });
  
// Get book details based on author

public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;
  try {
    const allBooks = await getBooks();
    const book = allBooks[isbn];
    if (book) {
      return res.status(200).json(book);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error fetching book by ISBN" });
  }
});

// public_users.get('/isbn/:isbn',function (req, res) {
//   //Write your code here
//   const isbn = req.params.isbn;
//   const book = books[isbn];

//   if (book) {
//     return res.status(200).json(book);
//   } else {
//     return res.status(404).json({ message: "Book not found" });
//   }
//  });


public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  try {
    const allBooks = await getBooks();
    let filteredBooks = [];

    Object.keys(allBooks).forEach(key => {
      if (allBooks[key].author === author) {
        filteredBooks.push(allBooks[key]);
      }
    });

    if (filteredBooks.length > 0) {
      return res.status(200).json(filteredBooks);
    } else {
      return res.status(404).json({ message: "No books found for this author" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error fetching books by author" });
  }
}); 

// public_users.get('/author/:author',function (req, res) {
//   //Write your code here
//   const author = req.params.author;
//   let filteredBooks = [];

//   Object.keys(books).forEach(key => {
//     if (books[key].author === author) {
//       filteredBooks.push(books[key]);
//     }
//   });

//   if (filteredBooks.length > 0) {
//     return res.status(200).json(filteredBooks);
//   } else {
//     return res.status(404).json({ message: "No books found for this author" });
//   }
//   // return res.status(300).json({message: "Yet to be implemented"});
// });

// Get all books based on title


// public_users.get('/title/:title', async function (req, res) {
//   const title = req.params.title;
//   try {
//     const allBooks = await getBooks();
//     let filteredBooks = [];

//     Object.keys(allBooks).forEach(key => {
//       if (allBooks[key].title === title) {
//         filteredBooks.push(allBooks[key]);
//       }
//     });

//     if (filteredBooks.length > 0) {
//       return res.status(200).json(filteredBooks);
//     } else {
//       return res.status(404).json({ message: "No books found with this title" });
//     }
//   } catch (err) {
//     return res.status(500).json({ message: "Error fetching books by title" });
//   }
// });

// public_users.get('/title/:title',function (req, res) {
//   //Write your code here
//   const title = req.params.title;
//   let filteredBooks = [];

//   Object.keys(books).forEach(key => {
//     if (books[key].title === title) {
//       filteredBooks.push(books[key]);
//     }
//   });

//   if (filteredBooks.length > 0) {
//     return res.status(200).json(filteredBooks);
//   } else {
//     return res.status(404).json({ message: "No books found with this title" });
//   }
//   // return res.status(300).json({message: "Yet to be implemented"});
// });

//  Get book review

public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;
  try {
    const allBooks = await getBooks();
    let filteredBooks = [];

    Object.keys(allBooks).forEach(key => {
      if (allBooks[key].title === title) {
        filteredBooks.push(allBooks[key]);
      }
    });

    if (filteredBooks.length > 0) {
      return res.status(200).json(filteredBooks);
    } else {
      return res.status(404).json({ message: "No books found with this title" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error fetching books by title" });
  }
});

// Get all books based on title
// public_users.get('/title/:title',function (req, res) {
//   //Write your code here
//   const title = req.params.title;
//   let filteredBooks = [];

//   Object.keys(books).forEach(key => {
//     if (books[key].title === title) {
//       filteredBooks.push(books[key]);
//     }
//   });

//   if (filteredBooks.length > 0) {
//     return res.status(200).json(filteredBooks);
//   } else {
//     return res.status(404).json({ message: "No books found with this title" });
//   }
// });

public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) {
    return res.status(200).json(book.reviews);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
  // return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
