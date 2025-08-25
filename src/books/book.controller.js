const Book = require("./book.model");

const postABook = async(req, res)=> {
    try {
        const newBook = await Book({...req.body});
        await newBook.save();
        res.status(200).send({message: "Book posted successfully", book: newBook })
    } catch (error) {
        console.error("Error creating book", error);
        res.status(200).send({message: "Faild to create book"})
    }
}

//get all books
const getAllBooks = async (req, res) =>{
    try {
        const books = await Book.find().sort({createdAt: -1});
        res.status(200).send(books)
    } catch (error) {
        console.error("Error fetching books", error);
        res.status(200).send({message: "Faild to fetch books"})
    }
}

const getSingleBook= async(req, res)=>{
    try {
        const {id} = req.params
        const book = await  Book.findById(id);
        if(!book){
            res.status(404).send({message: "Book not found!"})
        }
        res.status(200).send(book)
    } catch (error) {
        console.error("Error fetching books", error);
        res.status(200).send({message: "Faild to fetch books"})
    }

}

const UpdateBook = async (req,res)=>{
    try {
        const {id} = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new: true});
        if(!updatedBook){
            res.status(404).send({message: "Book not found!"})
        }
        res.status(200).send({
            message: "Book updated successfully",
            book: updatedBook
        })
    } catch (error) {
        console.error("Error updating a books", error);
        res.status(200).send({message: "Faild to update the books"})
    }
}

const deleteABook = async(req, res) => {
    try {
        const {id}= req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if(!deletedBook){
            res.status(404).send({message: "Book not found!"})
        }
        res.status(200).send({
            message: "Book deleted successfully",
            book: deletedBook
        })
    } catch (error) {
        console.error("Error deleting a books", error);
        res.status(200).send({message: "Faild to delete the books"})
    }
}

module.exports = {
    postABook,
    getAllBooks,
    getSingleBook,
    UpdateBook,
    deleteABook
}