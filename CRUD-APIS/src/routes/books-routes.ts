import { Router } from "express";
import {
  deleteBook,
  getAllBooks,
  getByID,
  postNewBook,
  updateBook,
} from "../controllers/book-controllers";

const routes = Router();

routes.get("/books", getAllBooks);
routes.get("/book/:id", getByID);
routes.post("/create", postNewBook);
routes.put("/update/:id", updateBook);
routes.delete("/delete/:id", deleteBook);

export default routes;
