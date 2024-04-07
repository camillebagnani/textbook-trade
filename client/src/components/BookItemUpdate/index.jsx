import React from "react";
import { useState } from "react";
import { UPDATE_BOOK } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

const BookItemUpdate = (props) => {
  const [addBookMenu, setAddBookMenu] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: props.bookData.title,
    authors: props.bookData.authors,
    subject: props.bookData.subject._id,
    isbn: props.bookData.isbn,
    image: props.bookData.image,
    price: props.bookData.price,
  });
  const [updateBook] = useMutation(UPDATE_BOOK);

  //console.log(props)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setSubmitted(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const response = await updateBook({
      variables: {
        id: props.bookData._id,
        bookData: {
          title: formData.title,
          authors: formData.authors,
          subject: formData.subject,
          isbn: formData.isbn,
          image: formData.image,
          price: parseInt(formData.price),
          user: props.bookData.user._id,
        },
      },
    });
    console.log("success")
    e.target.reset();
    setSubmitted(true);
    //   STILL TO DO: set to hide form once submitted
  };
  return (
    <div>
      <div className="card">
        <div className={addBookMenu ? "card-body" : "d-none"}>
          <form onSubmit={handleFormSubmit}>
            <h2>Update Book Form</h2>
            <div className="mb-3">
              <label htmlFor="titleInput" className="form-label">
                Title
              </label>
              <input
                value={formData.title}
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
                value={formData.authors}
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
                value={formData.isbn}
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
                <option>{formData.subject}</option>
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
                value={formData.price}
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
            <button
              type="submit"
              className={
                submitted ? "btn btn-primary d-none" : "btn btn-primary"
              }
            >
              Submit
            </button>
            <button
              type="button"
              className={
                submitted
                  ? "btn btn-success disabled"
                  : "btn btn-success disabled d-none"
              }
            >
              Success!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookItemUpdate;
