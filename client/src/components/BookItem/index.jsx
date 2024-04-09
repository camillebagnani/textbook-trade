import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row,
  Modal,
} from "react-bootstrap";
import { REMOVE_BOOK, ADD_TRANSACTION } from "../../utils/mutations";
import { UPDATE_BOOK } from "../../utils/mutations";
import BookItemUpdate from "../BookItemUpdate";

// import { useQuery } from '@apollo/client';
// import { QUERY_ALL_BOOKS } from '../utils/queries';
// import AuthService from '../utils/auth';

function BookItem(props) {
  const [addTransaction] = useMutation(ADD_TRANSACTION);
  const [removeBook] = useMutation(REMOVE_BOOK);
  const [updateBook] = useMutation(UPDATE_BOOK);
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    title: "",
    authors: "",
    subject: {},
    isbn: "",
    image: "",
    price: 0,
  });
  const [displayUpdateForm, setDisplayUpdateForm] = useState(false);

  //console.log(props.bookData);

  const handleDelete = async (event) => {
    const key = event.target.value;
    event.preventDefault();

    try {
      const { data } = await removeBook({
        variables: {
          _id: key,
        },
      });
    } catch (err) {
      console.error(err);
    }
    props.handleRefetch();
  };

  const handleUpdate = async (event) => {
    setDisplayUpdateForm(true);
  };

  const handleAddTransaction = async (event) => {
    const bookId = props.bookData._id;
    const sellerId = props.bookData.user._id;
    console.log(bookId);
    console.log(sellerId);
    event.preventDefault();

    try {
      const { data } = await addTransaction({
        variables: {
          sellerId: sellerId,
          book: bookId,
        },
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
    //props.handleRefetch();
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Container>
        <h1 className="graduate-regular text-danger fw-bold">Book for Trade</h1>

        <h2>{props.bookData.title}</h2>
        <img src={props.bookData.image} alt={props.bookData.title} />
        <h3>Authors: {props.bookData.authors}</h3>
        <h3>Subject: {props.bookData.subject.name}</h3>
        <h3>ISBN: {props.bookData.isbn}</h3>
        <h3>Price: ${props.bookData.price}</h3>
        <h3>Seller: {props.bookData.user.username}</h3>
        {props.bookData.sold ? (
          <h3>No Longer Available</h3>
        ) : (
          <div>
            <Button
              type="submit"
              onClick={handleAddTransaction}
              key={props.bookData._id}
              value={props.bookData.user._id}
              variant="primary"
              className={
                props.page === "Home"
                  ? submitted
                    ? "d-none"
                    : "btn btn-danger"
                  : "d-none"
              }
            >
              Buy This Book!
            </Button>
            <Button
              type="button"
              className={
                submitted
                  ? "btn btn-success disabled"
                  : "btn btn-success disabled d-none"
              }
            >
              Purchased!
            </Button>
          </div>
        )}
        <Button
          onClick={handleUpdate}
          variant="dark"
          type="submit"
          className={props.page === "User" ? "" : "d-none"}
        >
          Update book
        </Button>
        <Button
          value={props.bookData._id}
          onClick={handleDelete}
          variant="danger"
          type="submit"
          className={props.page === "User" ? "btn btn-warning" : "d-none"}
        >
          Delete
        </Button>
        {displayUpdateForm ? (
          <BookItemUpdate
            bookData={props.bookData}
            subjectData={props.subjectData}
          />
        ) : (
          ""
        )}
      </Container>
    </div>
  );
}

export default BookItem;
