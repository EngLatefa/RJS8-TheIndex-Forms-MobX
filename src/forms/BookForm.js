import React, { Component } from "react";
import { observer } from "mobx-react";

import BookStore from "../stores/BookStore";
import AuthorStore from "../stores/AuthorStore";

import { withRouter } from "react-router-dom";

class BookForm extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      color: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let authorID = this.props.match.params.authorID;
    BookStore.addBook(this.state, authorID);
    console.log(this.state);
  }

  render() {
    return (
      <div className="mt-5">
        <h1>{BookStore.statusMessage}</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Title</span>
            </div>
            <input
              type="text"
              className="form-control"
              value={this.state.title}
              name="title"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Color</span>
            </div>
            <input className="form-control" value={this.state.color} />
            <select name="color" onChange={this.handleChange}>
              <option value="blue">Blue</option>
              <option value="red">Red</option>
              <option value="yellow">Yellow</option>
              <option value="green">Green</option>
              <option value="white">White</option>
            </select>
          </div>
          <input type="submit" /> <br />
        </form>
      </div>
    );
  }
}

export default withRouter(observer(BookForm));
