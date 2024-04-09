import { useQuery } from "@apollo/client";
import { QUERY_ALL_SUBJECTS } from "../utils/queries";
import { queryUser } from "../utils/queryUser";
import AddBook from "../components/AddBook";
import BookListings from '../components/BookListings'
import TransactionContainer from "../components/TransactionContainer";


function User() {
  const { loading: subjectsLoading, data: subjectsData } =
    useQuery(QUERY_ALL_SUBJECTS);
  const subjectData = subjectsData?.subjects || [];

  const { userData, userId, refetch } = queryUser();

  const handleRefetch = () => {
    refetch();
  }

  return (
    <div>
      {userData &&
        <h1 className="graduate-regular text-danger p-5 fw-bolder text-center">{userData.me.username}'s Profile</h1>
      }
      {userData &&
        <BookListings userData={userData} bookData={userData.me.books} subjectData={subjectData} page={"User"} handleRefetch={() => handleRefetch()} />}
      <AddBook userData={userId} subjectData={subjectData} handleRefetch={() => handleRefetch()} />
      <TransactionContainer userData={userData} />
    </div>
  );
}

export default User;
