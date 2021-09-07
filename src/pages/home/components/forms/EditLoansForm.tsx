import React from "react";
import {LoanAction, Loan} from "../types/types";
import {LoanTableHeader} from "../LoanTableHeader";
import {LoanEntry} from "../LoanEntry";
import {LoanContext} from "../../HomePage"

type EditLoansFormProps = {
    loans: Loan[];
    loanDispatcher: (action: LoanAction) => void
}

export function EditLoansForm({loans, loanDispatcher}: EditLoansFormProps): JSX.Element {
    const savedResponse = React.useContext(LoanContext);
    let mLoanEntries = loans.map(loan =>
        <LoanEntry key={loan.id} loan={loan} loanDispatcher={loanDispatcher}/>
    );

    return (
        <div>
            <form onSubmit={() => {alert("Submitting...")}}>
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
