'use strict';

const Book = require('./bookModel');

exports.listBooks = async () => {

};

exports.getBook = async (bookId) => {

};

exports.createBook = async (bookData) => {
    console.log(bookData);
    // Create a new book instance
    const book = new Book(bookData);
    try {
        const doc = await book.save();
        return doc;
    } catch (e) {
        throw e;
    }
};