import React from 'react';

class LoanRow extends React.Component {

    render() {
        return (
            <tr>
                <td>{this.props.loan.name}</td>
                <td>{this.props.loan.interestRate}</td>
                <td>{this.props.loan.outstandingBalance}</td>
                <td>{this.props.loan.contribution}</td>
            </tr>
        );
    }
}

export default LoanRow;