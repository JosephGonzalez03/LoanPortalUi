import {Action, HandleLoanChange, Loan, State} from "./types/types";

type LoanEntryProps = {
    loan: Loan;
    onLoanChange: HandleLoanChange;
    dispatch: (action: Action) => void
}

export function LoanEntry({loan, onLoanChange, dispatch}: LoanEntryProps) {
    return (
        <tr>
            <td><input type="text" name="name" value={loan.name}
                       onChange={(event) => onLoanChange(loan.id, event)}/></td>
            <td><input type="number" name="interestRate" value={loan.interestRate}
                       onChange={(event) => onLoanChange(loan.id, event)}/></td>
            <td><input type="number" name="outstandingBalance" value={loan.outstandingBalance}
                       onChange={(event) => onLoanChange(loan.id, event)}/></td>
            <td><input type="number" name="contribution" value={loan.contribution}
                       onChange={(event) => onLoanChange(loan.id, event)}/></td>
            <td><input type="button" name="delete" value="-" onClick={() => dispatch({type: "Remove", loan: loan})}/></td>
        </tr>
    );
}
