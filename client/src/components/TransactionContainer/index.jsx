import { queryUser } from "../../utils/queryUser";
import { Container } from "react-bootstrap"
import OneTransaction from "../OneTransaction"

function TransactionContainer(props) {
    const {userData, userId, refetch} = queryUser();
//console.log("PROPS", props.userData)
    return (
        <>
        {userData && 
        <Container>
        <h2>{props.userData.me.username}'s Transactions</h2>
        {props.userData.me.transactions.map((transaction, i) => (
            <OneTransaction key={i} userData={props.userData} transactionData={transaction}/>
        ))}
        </Container>
        }
        </>
    
    )
}

export default TransactionContainer;