import React, { Component } from "react";
import AddBookModal from "./AddBookModal";

// Components
import BookTable from "./BookTable";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";

// Stores
import authorStore from "./stores/AuthorStore";
import bookStore from "./stores/BookStore";

class AuthorDetail extends Component {
  render() {
    const authorID = this.props.match.params.authorID;
    const author = authorStore.getAuthorById(authorID);
    const books = author.books.map(bookID => bookStore.getBookById(bookID));

    return (
      <div>
        <div>
          <AddBookModal />
          <h3>{author.first_name + " " + author.last_name}</h3>
          <img
            src={author.imageUrl}
            className="img-thumbnail img-fluid"
            alt={author.first_name + " " + author.last_name}
          />
        </div>
        <BookTable books={books} />
      </div>
    );
  }
}

export default withRouter(observer(AuthorDetail));
