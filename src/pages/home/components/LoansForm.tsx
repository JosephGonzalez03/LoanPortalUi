import React from "react";
import {Loan} from "./types/types";
import {LoanAction} from "./types/actions";
import {LoanTableHeader} from "./LoanTableHeader";
import {LoanContext} from "../Home"

type LoansFormProps = {
    loans: Loan[];
    onDispatchLoan: (action: LoanAction) => void
    onSubmit: (loans: Loan[], event: React.FormEvent<HTMLFormElement>) => void
}

export function LoansForm({loans, onDispatchLoan, onSubmit}: LoansFormProps): JSX.Element {
    const savedResponse = React.useContext(LoanContext);
    let mLoanEntries = loans.map((loan, index) =>
        <LoanEntry key={index} loan={loan} onDispatchLoan={onDispatchLoan}/>
    );

    return (
        <div>
            <form onSubmit={(event) => onSubmit(loans, event)}>
                <table>
                    <LoanTableHeader/>
                    <tbody>{mLoanEntries}</tbody>
                </table>
                <input type="button" name="add" value="+" onClick={() => onDispatchLoan({type: "ADD"})}/>
                <input type="submit" name="submit" value="Submit"/>
                <input type="reset" name="reset" value="Reset" onClick={() => onDispatchLoan({type: "INIT", loans: savedResponse.loans})}/>
            </form>
        </div>
    );
}

type LoanEntryProps = {
    loan: Loan;
    onDispatchLoan: (action: LoanAction) => void
}

function LoanEntry({loan, onDispatchLoan}: LoanEntryProps): JSX.Element {
    return (
        <tr>
            <td><input type="text" name="name" value={loan.name}
                       onChange={(event) => onDispatchLoan({type: "EDIT", loanId: loan.id, event: event})}/></td>
            <td><input type="number" name="interestRate" value={loan.interestRate}
                       onChange={(event) => onDispatchLoan({type: "EDIT", loanId: loan.id, event: event})}/></td>
            <td><input type="number" name="outstandingBalance" value={loan.outstandingBalance}
                       onChange={(event) => onDispatchLoan({type: "EDIT", loanId: loan.id, event: event})}/></td>
            <td><input type="number" name="contribution" value={loan.contribution}
                       onChange={(event) => onDispatchLoan({type: "EDIT", loanId: loan.id, event: event})}/></td>
            <td><input type="button" name="delete" value="-" onClick={() => onDispatchLoan({type: "REMOVE", loanId: loan.id})}/></td>
        </tr>
    );
}
