import React from "react";
import { Loan } from "../../../api/services/LoanService";
import { useLoans } from "../../../util/providers/LoanContextProvider";
import { LoanTableHeader } from "./LoanTableHeader";

type LoansFormProps = {
    onSubmit: (loans: Loan[], event: React.FormEvent<HTMLFormElement>) => void
}

export function LoansForm({onSubmit}: LoansFormProps): JSX.Element {
    const {loans, dispatchLoansAction} = useLoans();
    let mLoanEntries = loans
        .filter(loan => !loan.isRemoved)
        .map((loan, index) =>
            <LoanEntry key={index} loan={loan}/>
    );

    return (
        <div>
            <form onSubmit={(event) => onSubmit(loans, event)}>
                <table>
                    <LoanTableHeader/>
                    <tbody>{mLoanEntries}</tbody>
                </table>
                <input type="button" aria-label="add" value="+" onClick={() => dispatchLoansAction({type: "ADD"})}/>
                <input type="submit" aria-label="submit" value="Submit"/>
                <input type="reset" aria-label="reset" value="Reset" onClick={() => dispatchLoansAction({type: "RESET"})}/>
            </form>
        </div>
    );
}

type LoanEntryProps = {
    loan: Loan;
}

function LoanEntry({loan}: LoanEntryProps): JSX.Element {
    const {dispatchLoansAction} = useLoans();

    return (
        <tr>
            <td><input type="text" aria-label="name" value={loan.name}
                       onChange={(event) => dispatchLoansAction({type: "EDIT", loanId: loan.id, event: event})}/></td>
            <td><input type="number" aria-label="interestRate" value={loan.interestRate}
                       onChange={(event) => dispatchLoansAction({type: "EDIT", loanId: loan.id, event: event})}/></td>
            <td><input type="number" aria-label="outstandingBalance" value={loan.outstandingBalance}
                       onChange={(event) => dispatchLoansAction({type: "EDIT", loanId: loan.id, event: event})}/></td>
            <td><input type="number" aria-label="contribution" value={loan.contribution}
                       onChange={(event) => dispatchLoansAction({type: "EDIT", loanId: loan.id, event: event})}/></td>
            <td><input type="button" aria-label="delete" value="-" onClick={() => dispatchLoansAction({type: "REMOVE", loanId: loan.id})}/></td>
        </tr>
    );
}
