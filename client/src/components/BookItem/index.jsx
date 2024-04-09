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

function BookItem(props) {
  const [addTransaction] = useMutation(ADD_TRANSACTION);
  const [removeBook] = useMutation(REMOVE_BOOK);
  const [updateBook] = useMutation(UPDATE_BOOK);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
    window.location.reload()
  };
  const handleShow = () => setShow(true);
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
  };

  const handleUpdate = async (event) => {
    setDisplayUpdateForm(true);
  };

  const handleAddTransaction = async (event) => {
    // const bookTitle = props.bookData.title;
    console.log(props.bookData.user.username)
    const bookId = props.bookData._id;
    const sellerId = props.bookData.user._id;
    const price = props.bookData.price;
    event.preventDefault();

    try {
      const { data } = await addTransaction({
        variables: {
          sellerId: sellerId,
          book: bookId,
          price: price,
        },
      });
      handleShow();
      setSubmitted(true);
      console.log(props.bookData.user.username)

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Container>
        <div className={submitted ? "d-none" : ""}>
          <h1>{props.bookData.title}</h1>
          <img
            src={props.bookData.image}
            alt={props.bookData.title}
            className="img-fluid"
            style={{ maxWidth: "150px", maxHeight: "150px" }}
          />
          <h3>Authors: {props.bookData.authors}</h3>
          <h3>Subject: {props.bookData.subject.name}</h3>
          <h3>ISBN: {props.bookData.isbn}</h3>
          <h3>Price: ${props.bookData.price}</h3>
          <h3>Seller: {props.bookData.user.username}</h3>
        </div>
        {props.bookData.sold ? (
          <h3>No Longer Available</h3>
        ) : (
          <div>
            <Button
              data-toggle="modal"
              type="submit"
              onClick={handleAddTransaction}
              variant="danger"
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
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Book Purchased!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Thank you for shopping with us!
                {/* <p>You purchased {props.bookData.price}</p>
                <p>from {props.bookData.user.username}</p> */}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
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
          className={props.page === "User" ? "btn btn-danger" : "d-none"}
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
