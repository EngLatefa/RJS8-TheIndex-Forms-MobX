import { decorate, observable, computed } from "mobx";
import axios from "axios";
import AuthorStore from "../stores/AuthorStore";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class BookStore {
  constructor() {
    this.books = [];
    this.query = "";
    this.loading = true;
  }

  fetchBooks() {
    return instance
      .get("https://the-index-api.herokuapp.com/api/books/")
      .then(res => res.data)
      .then(books => {
        this.books = books;
        this.loading = false;
      })
      .catch(err => console.error(err));
  }

  get filteredBooks() {
    return this.books.filter(book => {
      return book.title.toLowerCase().includes(this.query.toLowerCase());
    });
  }

  getBookById(id) {
    return this.books.find(book => +book.id === +id);
  }

  getBooksByColor(color) {
    return this.filteredBooks.filter(book => book.color === color);
  }

  addBook(newBook, authorID) {
    console.log(authorID);
    let superNewBook = {
      ...newBook,
      authors: [authorID]
    };
    axios
      .post("https://the-index-api.herokuapp.com/api/books/", superNewBook)
      .then(res => res.data)
      .then(data => {
        this.statusMessage = "SUCESS!!";
        this.books.push(data);
      })

      .catch(err => console.error(err));
  }
}

decorate(BookStore, {
  books: observable,
  query: observable,
  loading: observable,
  filteredBooks: computed
});

const bookStore = new BookStore();
bookStore.fetchBooks();

export default bookStore;
