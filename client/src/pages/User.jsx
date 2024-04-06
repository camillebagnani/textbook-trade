import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_ALL_SUBJECTS } from "../utils/queries";
import AddBook from "../components/AddBook";
// import BookListings from '../components/BookListings';

function User() {
  const { loading: subjectsLoading, data: subjectsData } =
    useQuery(QUERY_ALL_SUBJECTS);
  const subjectData = subjectsData?.subjects || [];

  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
  const userId = userData?.me._id;

  return (
    <div>
      {/* <BookListings userData={userData} /> */}
      <AddBook userData={userId} subjectData={subjectData} />
    </div>
  );
}

export default User;
