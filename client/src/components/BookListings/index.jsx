import BookItem from '../BookItem'
function BookListings(props) {
  return (
    <div>
      <h1>Book Listings</h1>
      
      <BookItem bookData={props.bookData}/>
    </div>
  )
}

export default BookListings;
