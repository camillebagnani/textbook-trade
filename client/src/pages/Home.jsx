import { useState } from "react";
import { useQuery } from '@apollo/client'
import BookListings from "../components/BookListings"
import { QUERY_ALL_BOOKS } from "../utils/queries";
import { queryUser } from "../utils/queryUser";

function Home() {
  const { loading, data } = useQuery(QUERY_ALL_BOOKS);
  const bookData = data?.books || [];

  const {userData, userId, refetch} = queryUser();
  // console.log(bookData)

  // const [bookData, setBookData] = useState({

  // });

  // const getBookData = async () => {

  //   try {
  //   const { bookData } = await allBooks({
  //     variables: {bookData: books}
  //   });
  //   console.log("Testing!")
  // } catch (err) {
  //   console.error(err);
  // }
  // }

  return (
    <div>
      <h1>Home</h1>
      <a href="/subject" className="btn btn-secondary" >Search by Subject</a>
      {userData && <BookListings bookData={bookData} userData={userData}/>
      }
      
    </div>
  )
}

export default Home;
