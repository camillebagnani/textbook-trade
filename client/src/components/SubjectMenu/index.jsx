import { useState } from "react";
import { useQuery } from "@apollo/client";
import { SINGLE_SUBJECT, QUERY_ALL_SUBJECTS } from "../../utils/queries";
import BookListings from "../BookListings";

function SubjectMenu(props) {
  const [formState, setFormState] = useState({
    subject: "" 
  });
  const [addSubjectMenu, setSubjectMenu] = useState(false);

  const handleSubjectSearch = () => {
    setSubjectMenu(!addSubjectMenu);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const { loading: subjectBooksLoading, data: subjectBooksData } = useQuery(
    SINGLE_SUBJECT,
    {
      variables: { subject: formState.subject }
    }
  );
  const subjectBookData = subjectBooksData?.subject|| [];

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(subjectBookData)
  };

  return (
    <div className="card">
      <h2
        // className="btn btn-secondary"
        // type="button"
        // id="dropdownMenuButton"
        onClick={handleSubjectSearch}
      >
        Search by subject
      </h2>
      {addSubjectMenu && (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <select
                name="subject"
                className="form-control"
                id="subjectInput"
                onChange={handleChange}
                value={formState.subject} // Bind selected subject value
                required
              >
                <option value="">--Select a subject--</option>
                {props.subjectData &&
                  props.subjectData.map((subject) => (
                    <option key={subject._id} value={subject._id}>
                      {subject.name}
                    </option>
                  ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>
      )}
          {<BookListings bookData={subjectBookData}></BookListings>}
    </div>

  );
}

export default SubjectMenu;
