import {LoanTableHeader} from "../LoanTableHeader";
import {Loan} from "../types/types";

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

type LoanEntryProps = {
    loan: Loan;
}

function LoanEntry({loan}: LoanEntryProps) {
    return (
        <tr key={loan.id}>
            <td><input type="text" name="name" value={loan.name} /></td>
            <td><input type="number" name="interestRate" value={loan.interestRate} /></td>
            <td><input type="number" name="outstandingBalance" value={loan.outstandingBalance} /></td>
            <td><input type="number" name="contribution" value={loan.contribution} /></td>
            <td><input type="submit" name="delete" value="-"/></td>
        </tr>
    );
}