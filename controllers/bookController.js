const Book = require('../models/bookModel');
const Borrowing = require('../models/borrowingModel');

categories = ["מתח", "מדע בדיוני", "רגש", "היסטוריה", "הרפתקאות", "נוער", "אחר"];


exports.getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find().sort({ _id: -1 });
        const borrowings = await Borrowing.find({ returnDate: null }).populate('borrower').populate('book');
        
        const booksWithBorrower = books.map(book => {
            const borrowing = borrowings.find(b => b.book._id.toString() === book._id.toString());
            return {
                ...book.toObject(),
                currentBorrower: borrowing ? borrowing.borrower.name : null
            };
        });
        
        res.render('showAllBooks', { books: booksWithBorrower })
    }
    catch (err) {
        const error = new Error("Error occurred in Show all books " + err.message);
        error.status = 500;
        return next(error);
    }
}

exports.getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        res.render('bookDetails', { book });
    } catch (err) {
            const error = new Error("Error occurred in Show book by ID " + err.message);
            error.status = 500;
            return next(error);
        }
}

exports.addForm = (req, res) => {
    res.render('addBook', { categories });
}

exports.addBook = async (req, res, next) => {
    try {
        const { title, author, category, imageUrl, description, isPartOfSeries } = req.body;
        const book = new Book({
            title: title,
            author: author,
            category: categories[parseInt(category)],
            imageUrl: imageUrl,
            isAvailable: true,
            description: description,
            isPartOfSeries: isPartOfSeries === 'on' || isPartOfSeries === 'true' || isPartOfSeries === true
        })
        await book.save();
        res.redirect('/books');
    } catch (err) {
        const error = new Error("Error occurred in Add book " + err.message);
        error.status = 500;
        return next(error);
    }
}

exports.updateForm = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        res.render('updateBook', { book, categories });
    } catch (err) {
        const error = new Error("Error occurred in Show update form " + err.message);
        error.status = 500;
        return next(error);
    }
}

exports.updateBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        book.title = req.body.title;
        book.author = req.body.author;
        book.category = categories[parseInt(req.body.category)];
        book.imageUrl = req.body.imageUrl;
        book.isAvailable = req.body.isAvailable === 'on' || req.body.isAvailable === 'true' || req.body.isAvailable === true;
        book.description = req.body.description;
        book.isPartOfSeries = req.body.isPartOfSeries === 'on' || req.body.isPartOfSeries === 'true' || req.body.isPartOfSeries === true;
        await book.save();
        res.redirect('/books');
    } catch (err) {
        const error = new Error("Error occurred in Update book " + err.message);
        error.status = 500;
        return next(error);
    }
}

exports.deleteBook = async (req, res, next) => {
    try {
        await Book.deleteOne({ _id: req.params.id });
        res.redirect('/books');
    } catch (err) {
        const error = new Error("Error occurred in Delete book " + err.message);
        error.status = 500;
        return next(error);
    }
}

