import { useState } from "react";
import { useQuery } from '@apollo/client'
import BookListings from "../components/BookListings"
import { QUERY_ALL_BOOKS } from "../utils/queries";

function Home() {
  const { loading, data } = useQuery(QUERY_ALL_BOOKS);
  const bookData = data?.books || [];
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
      <BookListings bookData={bookData} />
    </div>
  )
}

export default Home;
