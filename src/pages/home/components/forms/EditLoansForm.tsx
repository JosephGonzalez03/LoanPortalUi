import {LoanTableHeader} from "../LoanTableHeader";
import {LoanAction, HandleLoanChange, Loan, State} from "../types/types";
import {LoanEntry} from "../LoanEntry";
import {useReducer} from "react";

type EditLoansFormProps = {
    loans: Loan[];
    onLoanChange: HandleLoanChange
}

export function EditLoansForm({loans, onLoanChange}: EditLoansFormProps): JSX.Element {
    const [state, dispatch] = useReducer(buttonClickReducer, {loans})

    let  mLoanEntries = loans.map(loan =>
        <LoanEntry key={loan.id} loan={loan} onLoanChange={onLoanChange} dispatch={dispatch}/>
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

function buttonClickReducer(state: State, action: LoanAction): State{
    let mLoans = state.loans;
    let randomNumber = Math.ceil(Math.random() * 1000000);
    let newList: Loan[];
    let loanCopy: Loan[] = JSON.parse(JSON.stringify(mLoans));
    
    switch (action.type) {
        case "Add":
            let oldHighestId: number = loanCopy.sort((loanA, loanB) => loanB.id - loanA.id)[0].id + 1;
            
            mLoans.push({id: oldHighestId+1, name: "", interestRate: 0.000, outstandingBalance: 0.00, contribution: 0.00});
            break;
        case "Remove":
            mLoans.splice( 
                mLoans.findIndex(loan => loan.id === action.loan.id? true : false),
                1
            );
            break;
    }

    return {loans: mLoans};
}
