import { useQuery } from "@apollo/client";
import BookListings from "../components/BookListings";
import { QUERY_ALL_BOOKS } from "../utils/queries";
import { queryUser } from "../utils/queryUser";
import Auth from "../utils/auth";
import Login from "../components/Login";

function Home() {
  const { loading, data } = useQuery(QUERY_ALL_BOOKS);
  const bookData = data?.books || [];

  const { userData, userId, refetch } = queryUser();

  function loginDisplay() {
    if (Auth.loggedIn()) {
      return (
        <div>
          <h1>Home</h1>
          <a href="/subject" className="btn btn-secondary">
            Search by Subject
          </a>
          {userData && (
            <BookListings
              bookData={bookData}
              userData={userData}
              page={"Home"}
            />
          )}
        </div>
      );
    } else {
      return (
        <div>
          <Login />
        </div>
      );
    }
  }

  return <div>{loginDisplay()}</div>;
}

export default Home;
