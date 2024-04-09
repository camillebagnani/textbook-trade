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

  const renderLogin = () => {
    if (Auth.loggedIn()) {
      return (
        <div className="text-center zilla-slab-regular">
          <h1 className="graduate-regular text-danger fw-bold">Home</h1>

          <a href="/subject" className="btn bg-dark text-light">
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
  };

  return <div className="text-center zilla-slab-regular">{renderLogin()}</div>;
}

export default Home;
