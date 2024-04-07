import BookItem from '../BookItem'
function BookListings(props) {
  const filteredBooks = props.bookData.filter(book => book.sold === false)

  return (
    <div>
      <h1>Book Listings</h1>
      {filteredBooks.map((book, i) => (
        <BookItem key={i} bookData={book} subjectData={props.subjectData} userData={props.userData} page={props.page} handleRefetch={props.handleRefetch}/>
      
      ))}
    </div>
  )
}

export default BookListings;
