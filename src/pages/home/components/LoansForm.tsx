import React from "react";
import {Loan} from "./types/types";
import {LoanAction} from "./types/actions";
import {LoanTableHeader} from "./LoanTableHeader";
import {useLoans} from "../../../store/LoanProvider"

type LoansFormProps = {
    onSubmit: (loans: Loan[], event: React.FormEvent<HTMLFormElement>) => void
}

export function LoansForm({onSubmit}: LoansFormProps): JSX.Element {
    const {loans, dispatchLoansAction} = useLoans();
    let mLoanEntries = loans.map((loan, index) =>
        <LoanEntry key={index} loan={loan}/>
    );

    return (
        <div>
            <form onSubmit={(event) => onSubmit(loans, event)}>
                <table>
                    <LoanTableHeader/>
                    <tbody>{mLoanEntries}</tbody>
                </table>
                <input type="button" name="add" value="+" onClick={() => dispatchLoansAction({type: "ADD"})}/>
                <input type="submit" name="submit" value="Submit"/>
                <input type="reset" name="reset" value="Reset" onClick={() => dispatchLoansAction({type: "RESET"})}/>
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
            <td><input type="text" name="name" value={loan.name}
                       onChange={(event) => dispatchLoansAction({type: "EDIT", loanId: loan.id, event: event})}/></td>
            <td><input type="number" name="interestRate" value={loan.interestRate}
                       onChange={(event) => dispatchLoansAction({type: "EDIT", loanId: loan.id, event: event})}/></td>
            <td><input type="number" name="outstandingBalance" value={loan.outstandingBalance}
                       onChange={(event) => dispatchLoansAction({type: "EDIT", loanId: loan.id, event: event})}/></td>
            <td><input type="number" name="contribution" value={loan.contribution}
                       onChange={(event) => dispatchLoansAction({type: "EDIT", loanId: loan.id, event: event})}/></td>
            <td><input type="button" name="delete" value="-" onClick={() => dispatchLoansAction({type: "REMOVE", loanId: loan.id})}/></td>
        </tr>
    );
}
