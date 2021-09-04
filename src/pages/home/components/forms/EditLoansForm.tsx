import {LoanTableHeader} from "../LoanTableHeader";
import {LoanAction, HandleLoanChange, Loan} from "../types/types";
import {LoanEntry} from "../LoanEntry";

type EditLoansFormProps = {
    loans: Loan[];
    loanDispatcher: (action: LoanAction) => void
    onLoanChange: HandleLoanChange
}

export function EditLoansForm({loans, loanDispatcher, onLoanChange}: EditLoansFormProps): JSX.Element {

    let mLoanEntries = loans.map(loan =>
        <LoanEntry key={loan.id} loan={loan} onLoanChange={onLoanChange} dispatch={loanDispatcher}/>
    );

    return (
        <div>
            <form onSubmit={() => {alert("Submitting...")}}>
                <table>
                    <LoanTableHeader/>
                    <tbody>{mLoanEntries}</tbody>
                </table>
                <input type="button" name="add" value="+" onClick={() => loanDispatcher({type: "Add"})}/>
                <input type="submit" name="submit" value="Submit"/>
                <input type="reset" name="reset" value="Reset"/>
            </form>
        </div>
    );
}
