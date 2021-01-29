import {LoanTableHeader} from "../LoanTableHeader";
import {Loan} from "../types/types";
import {LoanEntry} from "../LoanEntry";

type EditLoansFormProps = {
    loans: Loan[];
}

export function EditLoansForm({loans}: EditLoansFormProps): JSX.Element {
    const mLoanEntries = loans.map(loan => <LoanEntry key={loan.id} loan={loan}/>);

    return (
        <div>
            <form onSubmit={() => {alert("Submitting...")}}>
                <table>
                    <LoanTableHeader/>
                    <tbody>{mLoanEntries}</tbody>
                </table>
                <input type="button" name="add" value="+" />
                <input type="submit" name="submit" value="Submit"/>
                <input type="reset" name="reset" value="Reset"/>
            </form>
        </div>
    );
}