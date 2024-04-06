import BookItem from '../BookItem'
function BookListings(props) {
  return (
    <div>
      <h1>Book Listings</h1>
      {props.bookData.map((book, i) => (
        <BookItem key={i} bookData={book} userData={props.userData}/>
      
      ))}
    </div>
  )
}

export default BookListings;
