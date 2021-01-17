import React from 'react';
import LoanRow from './LoanRow'

class LoanTable extends React.Component {

    render() {
        const data = [{id: 1, name: 'Loan a', interestRate: 5.000, outstandingBalance: 1000.00, contribution: 100.00}];
        const mLoanRows = [];
        data.forEach((loan) => {
                mLoanRows.push(
                    <LoanRow key={loan.id} loan={loan}/>
                );
            }
        );

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Loan</th>
                            <th>Interest Rate</th>
                            <th>Outstanding Balance</th>
                            <th>Contribution</th>
                        </tr>
                    </thead>
                    <tbody>{mLoanRows}</tbody>
                </table>
                <button onClick={console.log("Calculating...")}>Calculate</button>
                <button onClick={console.log("Editing...")}>Edit</button>
            </div>
        );
    }
}

export default LoanTable;
