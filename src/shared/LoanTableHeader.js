import React from 'react';

class LoanTableHeader extends React.Component {
    render() {
        return (
            <thead>
                <tr>
                    <th>Loan</th>
                    <th>Interest Rate</th>
                    <th>Outstanding Balance</th>
                    <th>Contribution</th>
                </tr>
            </thead>
        );
    }
}

export default LoanTableHeader;