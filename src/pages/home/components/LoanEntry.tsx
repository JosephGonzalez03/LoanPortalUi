import {LoanAction, Loan} from "./types/types";

type LoanEntryProps = {
    loan: Loan;
    loanDispatcher: (action: LoanAction) => void
}

export function LoanEntry({loan, loanDispatcher}: LoanEntryProps) {
    return (
        <tr>
            <td><input type="text" name="name" value={loan.name}
                       onChange={(event) => loanDispatcher({type: "EDIT", loanId: loan.id, event: event})}/></td>
            <td><input type="number" name="interestRate" value={loan.interestRate}
                       onChange={(event) => loanDispatcher({type: "EDIT", loanId: loan.id, event: event})}/></td>
            <td><input type="number" name="outstandingBalance" value={loan.outstandingBalance}
                       onChange={(event) => loanDispatcher({type: "EDIT", loanId: loan.id, event: event})}/></td>
            <td><input type="number" name="contribution" value={loan.contribution}
                       onChange={(event) => loanDispatcher({type: "EDIT", loanId: loan.id, event: event})}/></td>
            <td><input type="button" name="delete" value="-" onClick={() => loanDispatcher({type: "REMOVE", loanId: loan.id})}/></td>
        </tr>
    );
}
