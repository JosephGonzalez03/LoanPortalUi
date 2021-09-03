import {LoanTableHeader} from "../LoanTableHeader";
import {Action, HandleLoanChange, Loan, State} from "../types/types";
import {LoanEntry} from "../LoanEntry";
import {useReducer} from "react";

type EditLoansFormProps = {
    loans: Loan[];
    onLoanChange: HandleLoanChange
}

export function EditLoansForm({loans, onLoanChange}: EditLoansFormProps): JSX.Element {
    const [state, dispatch] = useReducer(buttonClickReducer, {loans})

    const mLoanEntries = loans.map(loan =>
        <LoanEntry key={loan.id} loan={loan} handleLoanChange={onLoanChange} dispatch={dispatch}/>
    );

    return (
        <div>
            <form onSubmit={() => {alert("Submitting...")}}>
                <table>
                    <LoanTableHeader/>
                    <tbody>{mLoanEntries}</tbody>
                </table>
                <input type="button" name="add" value="+" onClick={() => dispatch({type: "Add"})}/>
                <input type="submit" name="submit" value="Submit"/>
                <input type="reset" name="reset" value="Reset"/>
            </form>
        </div>
    );
}

function buttonClickReducer(state: State, action: Action): State{
    const mLoans = state.loans;

    switch (action.type) {
        case "Add":
            mLoans.push({id: 0, name: "", interestRate: 0.000, outstandingBalance: 0.00, contribution: 0.00});
            break;
        case "Remove":
            mLoans.filter(loan => JSON.stringify(loan) !== JSON.stringify(action.loan));
            break;
    }

    return {loans: mLoans};
}