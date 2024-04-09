import BookItem from '../BookItem'
import Card from 'react-bootstrap/Card'

function BookListings(props) {
  const filteredBooks = props.bookData.filter(book => book.sold === false)

  return (
    <div className="zilla-slab-regular">
      <h1 className="graduate-regular text-danger p-5 fw-bolder">Book Listings</h1>
      {filteredBooks.map((book, i) => (
        <Card key={i} className="p-4">
          <BookItem bookData={book} subjectData={props.subjectData} userData={props.userData} page={props.page} handleRefetch={props.handleRefetch}/>
        </Card>
      ))}
    </div>
  )
}

export default BookListings;