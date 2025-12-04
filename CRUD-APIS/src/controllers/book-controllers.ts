import { Request, Response } from "express";

const books = [
  {
    id: 1,
    title: "Maths",
    author: "Arqam",
  },
  {
    id: 2,
    title: "Physics",
    author: "Fahad",
  },
  {
    id: 3,
    title: "Chemistry",
    author: "Uzair",
  },
];

type BookType = {
  id: number;
  title: string;
  author: string;
};

export function getAllBooks(req: Request, res: Response) {
  const resObj = {
    messsage: "Data Fetched Succesfully!",
    data: books,
  };
  res.status(200).json(resObj);
}

export const getByID = (req: Request, res: Response) => {
  const bookID: number = Number(req.params.id);

  if (!bookID) {
    return res.status(400).json({ message: "Book ID is required" });
  }

  const book = books.find(
    (book: { id: number; title: string; author: string }) => book.id === bookID
  );

  if (!book) {
    return res.status(404).json({ message: "Book not Found!" });
  }

  res.status(200).json({ message: "Book Found Succesfully", data: book });
};

export function postNewBook(req: Request, res: Response) {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "Title and Author Both are required" });
  }

  const newBook = {
    id: books.length + 1,
    title: title,
    author: author,
  };

  books.push(newBook);
  res
    .status(200)
    .json({ message: "New Book Succesfully created", data: newBook });
}

export function updateBook(req: Request, res: Response) {
  const bookID: number = Number(req.params.id);

  if (!bookID) {
    return res.status(400).json({ message: "Book ID is required!" });
  }

  const { title, author } = req.body;

  if (!title && !author) {
    return res
      .status(400)
      .json({
        message: "At least one field (Title or Author) is must be required",
      });
  }

  const updatedBook = books.find(
    (book: { id: number; title: string; author: string }) => book.id === bookID
  );

  if (!updatedBook) {
    return res.status(404).json({ message: "Book Not Found!" });
  }

  if (title) updatedBook.title = title;
  if (author) updatedBook.author = author;

  res
    .status(200)
    .json({ message: "Book Updated Succesfully", data: updatedBook });
}

export function deleteBook(req: Request, res: Response) {
  const bookID: number = Number(req.params.id);

  if (!bookID) {
    return res.status(400).json({ message: "Book Id is required" });
  }

  const bookIndex = books.findIndex((book) => book.id === bookID);

  const deletedBook = books.splice(bookIndex, 1);

  if (bookIndex === -1) {
    return res.status(404).json({ Message: "Book Not Found!" });
  }
  // console.log(deletedBook);

  res
    .status(200)
    .json({ message: "Book deleted Succesfully!", data: deletedBook });
}
