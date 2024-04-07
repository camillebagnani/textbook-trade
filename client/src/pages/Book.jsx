import { useState, useEffect } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_BOOKS } from '../utils/queries';
import AuthService from '../utils/auth';


function Book() {
  return (
    <div>
      <Container>
        <h1>Book for Trade</h1>
        <h2>{bookData.title}</h2>
        <img src={bookData.image} alt={bookData.title} />
        <h3>Authors: {bookData.authors}</h3>
        <h3>Subject: {bookData.subject}</h3>
        <h3>ISBN: {bookData.isbn}</h3>
        <h3>Price: ${bookData.price}</h3>
        <h3>Seller: {bookData.user}</h3>
        {bookData.sold ?
          <h3>No Longer Available</h3> :
          <Button variant="primary" type="submit">
            Available for Purchase
          </Button>
        }
      </Container>

    </div>
  )
}

export default Book;
