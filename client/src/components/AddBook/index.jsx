import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BOOK } from "../../utils/mutations";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AddBook(props) {
  const [formState, setFormState] = useState({
    title: "",
    authors: "",
    subject: {},
    isbn: "",
    image: "/textbook-icon.png",
    price: 0,
  });
  const [addBook] = useMutation(ADD_BOOK);
  const [submitted, setSubmitted] = useState(false);
  const [addBookMenu, setBookMenu] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await addBook({
      variables: {
        bookData: {
          title: formState.title,
          authors: formState.authors,
          subject: formState.subject,
          isbn: formState.isbn,
          image: formState.image,
          price: parseInt(formState.price),
          user: props.userData,
        },
      },
    });
    e.target.reset();
    setSubmitted(true);
    setBookMenu(false); 
    console.log(response);
    props.handleRefetch()
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    setSubmitted(false);
  };

  const handleAddBook = () => {
    if (addBookMenu) {
      setBookMenu(false);
    } else {
      setBookMenu(true);
    }
  };

  return (
    <div className="modal show text-center"
      style={{ display: 'block', position: 'initial' }}>
      <Button
        className="m-3"
        size="lg"
        variant="info"
        id="dropdownMenuButton"
        onClick={handleAddBook}
      >
        List a book
      </Button>
      <div className={addBookMenu ? "card-body" : "d-none"}>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="titleInput" className="form-label">
              Title
            </label>
            <input
              name="title"
              type="text"
              className="form-control"
              id="titleInput"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="authorInput" className="form-label">
              Author(s)
            </label>
            <input
              name="authors"
              type="text"
              className="form-control"
              id="authorInput"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="isbnInput" className="form-label">
              ISBN
            </label>
            <input
              name="isbn"
              type="text"
              className="form-control"
              id="isbnInput"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="subjectInput" className="form-label">
              Subject
            </label>
            <select
              name="subject"
              className="form-control"
              id="subjectInput"
              onChange={handleChange}
              required
            >
              <option>--Select a subject--</option>
              {props.subjectData.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="priceInput" className="form-label">
              Price
            </label>
            <input
              name="price"
              type="number"
              step="0.01"
              min="0"
              className="form-control"
              id="priceInput"
              onChange={handleChange}
              required
            />
          </div>
          <Button
            type="submit"
            className={submitted ? "d-none" : "btn btn-primary"}
          >
            Submit
          </Button>
          <Button
            type="button"
            className={
              submitted
                ? "btn btn-success disabled"
                : "btn btn-success disabled d-none"
            }
          >
            Success!
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
