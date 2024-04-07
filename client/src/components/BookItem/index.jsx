import { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";
// import { useQuery } from '@apollo/client';
// import { QUERY_ALL_BOOKS } from '../utils/queries';
// import AuthService from '../utils/auth';

function BookItem(props) {
  console.log(props.page);
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
