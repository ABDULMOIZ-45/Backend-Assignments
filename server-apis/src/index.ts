import express from "express";
import routes from "./routes/books-routes";
import { logger } from "./middlewares/logger";

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(logger);
// <-------OR------>
// app.use(express.json(), logger);

app.use("/api", routes);

app.listen(PORT, () => {
  console.log("Server is running... at 3000 Port ");
});























// import express, { Request,Response } from "express";

// const app = express();
// const PORT = 3000;
// app.use(express.json());

// const books = [
//     {
//         id: 1,
//         title: "java",
//         author: "Elon Mask"
//     },
//     {
//         id: 2,
//         title: "Python",
//         author: "Mark"
//     }
// ]

// app.get('/books', (req: Request, res: Response) => {
//     const resObj = {
//         message: "Data Fetched Successfully!",
//         data: books
//     }
//     res.status(200).json(resObj)
// })

// app.get('/book/:id',(req: Request, res: Response) => {
//     const bookID:number = Number(req.params.id);

//     if(!bookID) {
//         return res.status(400).json({message: 'Book ID is Required'});
//     }

//     const book = books.find((book: {id: number, title: string, author: string}) => book.id === bookID);

//     if(!book) {
//         return res.status(404).json({message: 'Book Not Found'});
//     }

//     res.status(200).json({message: 'Book Found', data: book});
// })

// app.post('/create', (req: Request, res: Response) => {
//     const { title, author } = req.body;
//     if(!title || !author) {
//         return res.status(400).json({message: "Title or Author is required"});
//     }
//     const newBook = {
//         id: books.length + 1,
//         title: title,
//         author: author
//     }
//     books.push(newBook);
//     res.status(200).json({message: "Succesfully Created", data: newBook});
// })

// app.delete('/delete/:id', (req: Request, res: Response) => {
//     const bookID:number = Number(req.params.id)

//     if(!bookID) {
//         return res.status(400).json({message: "Book ID is required"});
//     }

//     const index = books.findIndex(book => book.id === bookID);

//     const deletedBook = books.splice(index, 1);
//     console.log(deletedBook);

//     if(deletedBook.length === 0) return res.status(400).json({message: "Book not Found"});

//     res.status(200).json({message: "Succesfully Deleted", data: deletedBook})

// })

// app.listen(PORT, () => {
//     console.log("Server is running... at localhost 3000 port");
// });

// console.log("Hello TypeScript with Noode.js!");
// const greet = (name: string): string => {
//     return`Hello, ${name}! Welcome to Node.js With TypeScript`;
// };
// console.log(greet("Abdul Moiz"));
