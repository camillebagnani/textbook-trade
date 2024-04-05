import BookItem from '../BookItem'
function BookListings(props) {
  return (
    <div>
      <h1>Book Listings</h1>
      {props.bookData.map((book) => (
        <BookItem bookData={book} />
      
      ))}
    </div>
  )
}

export default BookListings;
