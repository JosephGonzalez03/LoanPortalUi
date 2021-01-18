import React from 'react';

class LoanEntry extends React.Component {
    render() {
        return (
            <tr>
                <td><input type="text" name="name" value={this.props.loan.name} /></td>
                <td><input type="number" name="interestRate" value={this.props.loan.interestRate} /></td>
                <td><input type="number" name="outstandingBalance" value={this.props.loan.outstandingBalance} /></td>
                <td><input type="number" name="contribution" value={this.props.loan.contribution} /></td>
                <td><input type="submit" name="delete" value="-"/></td>
            </tr>
        );
    }
}

export default LoanEntry;