import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";
import { REMOVE_BOOK } from "../../utils/mutations";
import { UPDATE_BOOK } from "../../utils/mutations";
// import { useQuery } from '@apollo/client';
// import { QUERY_ALL_BOOKS } from '../utils/queries';
// import AuthService from '../utils/auth';

function BookItem(props) {
  const [removeBook] = useMutation(REMOVE_BOOK);

  console.log(props.bookData);

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
  }

  return (
    <div>
      <Container>
        <h1>Book for Trade</h1>

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
          <Button
            variant="primary"
            type="submit"
            className={props.page === "Home" ? "" : "d-none"}
          >
            Available for Purchase
          </Button>
        )}
        <Button
          variant="primary"
          type="submit"
          className={props.page === "User" ? "" : "d-none"}
        >
          Update book
        </Button>
        <Button
        value={props.bookData._id}
          onClick={handleDelete}
          variant="primary"
          type="submit"
          className={props.page === "User" ? "btn btn-warning" : "d-none"}
        >
          Delete
        </Button>
      </Container>
    </div>
  );
}

export default BookItem;
