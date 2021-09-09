import React from "react";
import {Loan} from "../types/types";
import {LoanAction} from "../types/actions"
import {LoanTableHeader} from "../LoanTableHeader";
import {LoanEntry} from "../LoanEntry";
import {LoanContext} from "../../HomePage"

type LoansFormProps = {
    loans: Loan[];
    loanDispatcher: (action: LoanAction) => void
}

export function LoansForm({loans, loanDispatcher}: LoansFormProps): JSX.Element {
    const savedResponse = React.useContext(LoanContext);
    let mLoanEntries = loans.map(loan =>
        <LoanEntry key={loan.id} loan={loan} loanDispatcher={loanDispatcher}/>
    );

    return (
        <div>
            <form onSubmit={(event) => loanDispatcher({type: "SUBMIT", loans: loans, event: event})}>
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
