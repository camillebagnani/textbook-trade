import { Container, Card } from "react-bootstrap";
import dayjs from "dayjs";

function OneTransaction(props) {
  const isBuyer = props.transactionData.buyerId._id;
  const isSeller = props.transactionData.sellerId._id;
  const userId = props.userData.me._id;
  const date = props.transactionData.purchaseDate/1000;
  const formattedDate = dayjs.unix(date).format('MMM D, YYYY');

  return (
    <div>
      <Container>
        {isBuyer === userId && (
          <>
            <Card>
              <div
                className="card card text-center"
                style={{ alignItems: "center" }}
              >
                <div className="card-body">
                  <h5 className="card-title">
                    {props.transactionData.book.title}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    Purchased from {props.transactionData.sellerId.username}
                  </h6>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    for ${props.transactionData.price}
                  </h6>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    on {formattedDate}
                  </h6>
                </div>
              </div>
            </Card>
          </>
        )}
        {isSeller === userId && (
          <>
            <Card>
              <div
                className="card card text-center"
                style={{ alignItems: "center" }}
              >
                <div className="card-body">
                  <h5 className="card-title">
                    {props.transactionData.book.title}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    Sold to {props.transactionData.buyerId.username}
                  </h6>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    for {props.transactionData.price}
                  </h6>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    on {formattedDate}
                  </h6>
                </div>
              </div>
            </Card>
          </>
        )}
      </Container>
    </div>
  );
}

export default OneTransaction;
