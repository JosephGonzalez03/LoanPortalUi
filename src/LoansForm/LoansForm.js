import React from 'react';
import LoanTableHeader from "../shared/LoanTableHeader";
import LoanEntry from "./LoanEntry";

class LoansForm extends React.Component {
    render() {
        const data = [
            {id: 1, name: 'Loan a', interestRate: 5.000, outstandingBalance: 1000.00, contribution: 100.00},
            {id: 2, name: 'Loan b', interestRate: 5.000, outstandingBalance: 1000.00, contribution: 100.00}];
        const mLoanEntries = data.map(loan =>
            <LoanEntry key={loan.id} loan={loan}/>
        );
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
}

export default LoansForm;