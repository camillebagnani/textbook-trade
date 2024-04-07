import { Container } from "react-bootstrap";

function OneTransaction(props) {
    console.log("PROPS FROM ONE TRANSACTION", props.transactionData)
    return (
        <div>
            <Container>
                {/* if sellerId */}
                <h1>{props.transactionData.book.title}</h1>
                <div>Purchased from {props.transactionData.sellerId.username}</div>
                {/* if userId */}
                <h1>{props.transactionData.book.title}</h1>
                <div>Sold to</div>
            </Container>
        </div>
    );
}

export default OneTransaction;
