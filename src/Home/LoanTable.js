import React from 'react';
import LoanRow from './LoanRow'
import LoanTableHeader from "../shared/LoanTableHeader";

class LoanTable extends React.Component {

    render() {
        const data = [{id: 1, name: 'Loan a', interestRate: 5.000, outstandingBalance: 1000.00, contribution: 100.00}];
        const mLoanRows = [];
        data.forEach((loan) => {
                mLoanRows.push(
                    <LoanRow key={loan.id}/>
                );
            }
        );

        return (
            <div>
                <table>
                    <LoanTableHeader/>
                    <tbody>{mLoanRows}</tbody>
                </table>
                <button onClick={console.log("Calculating...")}>Calculate</button>
                <button onClick={console.log("Editing...")}>Edit</button>
            </div>
        );
    }
}

export default LoanTable;
