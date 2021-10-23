import {Loan} from "../../../api/services/LoanService"
import {LoanTableHeader} from "./LoanTableHeader";

type LoanTableProps = {
    loans: Loan[];
}

export function LoanTable({loans}: LoanTableProps): JSX.Element {
    const mLoanRows = loans.map((loan, index) => <LoanRow key={index} loan={loan}/>);

    return (
        <div>
            <table>
                <LoanTableHeader/>
                <tbody>{mLoanRows}</tbody>
            </table>
            <button onClick={() => console.log("Calculating...")}>Calculate</button>
            <button onClick={() => console.log("Editing...")}>Edit</button>
        </div>
    );
}

type LoanRowProps = {
    loan: Loan;
}

export function LoanRow({loan}: LoanRowProps): JSX.Element {
    return (
        <tr>
            <td>{loan.name}</td>
            <td>{loan.interestRate}</td>
            <td>{loan.outstandingBalance}</td>
            <td>{loan.contribution}</td>
        </tr>
    );
}
