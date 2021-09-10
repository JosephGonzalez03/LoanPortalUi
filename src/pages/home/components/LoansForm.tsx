import React from "react";
import {Loan} from "./types/types";
import {LoanAction} from "./types/actions";
import {LoanTableHeader} from "./LoanTableHeader";
import {LoanContext} from "../Home"

type LoansFormProps = {
    loans: Loan[];
    loanDispatcher: (action: LoanAction) => void
    onSubmit: (loans: Loan[], event: React.FormEvent<HTMLFormElement>) => void
}

export function LoansForm({loans, loanDispatcher, onSubmit}: LoansFormProps): JSX.Element {
    const savedResponse = React.useContext(LoanContext);
    let mLoanEntries = loans.map(loan =>
        <LoanEntry key={loan.id} loan={loan} loanDispatcher={loanDispatcher}/>
    );

    return (
        <div>
            <form onSubmit={(event) => onSubmit(loans, event)}>
                <table>
                    <LoanTableHeader/>
                    <tbody>{mLoanEntries}</tbody>
                </table>
                <input type="button" name="add" value="+" onClick={() => loanDispatcher({type: "ADD"})}/>
                <input type="submit" name="submit" value="Submit"/>
                <input type="reset" name="reset" value="Reset" onClick={() => loanDispatcher({type: "INIT", loans: savedResponse.loans})}/>
            </form>
        </div>
    );
}

type LoanEntryProps = {
    loan: Loan;
    loanDispatcher: (action: LoanAction) => void
}

function LoanEntry({loan, loanDispatcher}: LoanEntryProps): JSX.Element {
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
