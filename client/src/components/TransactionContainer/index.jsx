import { queryUser } from "../../utils/queryUser";
import { Container } from "react-bootstrap"
import OneTransaction from "../OneTransaction"

function TransactionContainer(props) {
    const {userData, userId, refetch} = queryUser();
//console.log("PROPS", props.userData)
    return (
        <>
        {userData && userData.me.transactions.length > 0 && 
        <Container className="mb-5">
        <h2 className="text-center graduate-regular fw-bold text-danger p-5">{props.userData.me.username}'s Transactions</h2>
        {props.userData.me.transactions.map((transaction, i) => (
            <OneTransaction key={i} userData={props.userData} transactionData={transaction}/>
        ))}
        </Container>
        }
        </>
    
    )
}

export default TransactionContainer;