import {Loan} from './types/types'
import {LoanTableHeader} from "./LoanTableHeader";
import {LoanRow} from "./LoanRow";

type LoanTableProps = {
    loans: Loan[];
}

export function LoanTable({loans}: LoanTableProps): JSX.Element {
    const mLoanRows = loans.map(loan => <LoanRow key={loan.id} loan={loan}/>);

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