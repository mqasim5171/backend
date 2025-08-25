const express = require('express');
const Book = require('./book.model');
const { postABook, getAllBooks, getSingleBook, UpdateBook, deleteABook } = require('./book.controller');
const router = express.Router();

//post a book
router.post("/create-book", postABook)

//geet all books
router.get("/",getAllBooks)

//single book endpoints
router.get("/:id",getSingleBook);

//update a book 
router.put("/edit/:id",UpdateBook);

//delete a book
router.delete("/:id",deleteABook);


module.exports = router;
