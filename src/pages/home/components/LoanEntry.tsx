import {LoanAction, Loan} from "./types/types";

type LoanEntryProps = {
    loan: Loan;
    dispatch: (action: LoanAction) => void
}

export function LoanEntry({loan, dispatch}: LoanEntryProps) {
    return (
        <tr>
            <td><input type="text" name="name" value={loan.name}
                       onChange={(event) => dispatch({type: "Edit", loanId: loan.id, event: event})}/></td>
            <td><input type="number" name="interestRate" value={loan.interestRate}
                       onChange={(event) => dispatch({type: "Edit", loanId: loan.id, event: event})}/></td>
            <td><input type="number" name="outstandingBalance" value={loan.outstandingBalance}
                       onChange={(event) => dispatch({type: "Edit", loanId: loan.id, event: event})}/></td>
            <td><input type="number" name="contribution" value={loan.contribution}
                       onChange={(event) => dispatch({type: "Edit", loanId: loan.id, event: event})}/></td>
            <td><input type="button" name="delete" value="-" onClick={() => dispatch({type: "Remove", loanId: loan.id})}/></td>
        </tr>
    );
}
