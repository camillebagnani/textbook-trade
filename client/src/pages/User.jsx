import { useQuery } from "@apollo/client";
import { QUERY_ALL_SUBJECTS } from "../utils/queries";
import AddBook from "../components/AddBook";
import BookListings from '../components/BookListings'
import { queryUser } from "../utils/queryUser";

function User() {
  const { loading: subjectsLoading, data: subjectsData } =
    useQuery(QUERY_ALL_SUBJECTS);
  const subjectData = subjectsData?.subjects || [];


  // const { loading: userLoading, data: userData, refetch } = useQuery(QUERY_ME);
  // const userId = userData?.me._id;

  const { userData, userId, refetch } = queryUser();

  const handleRefetch = () => {
    refetch();
  }

  return (
    <div>
      {userData &&
        <BookListings userData={userData} bookData={userData.me.books} />}

      <AddBook userData={userId} subjectData={subjectData} handleRefetch={() => handleRefetch()} />
    </div>
  );
}

export default User;
