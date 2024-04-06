import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BOOK } from "../../utils/mutations";

function AddBook(props) {
  const [formState, setFormState] = useState({
    title: "",
    authors: "",
    subject: {},
    isbn: "",
    image: "",
    price: 0,
  });
  const [addBook] = useMutation(ADD_BOOK);

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
    console.log(response);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title mb-3">List a book</h4>
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
