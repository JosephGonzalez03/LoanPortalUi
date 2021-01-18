import React from 'react';

class PaymentSummaryRow extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.month}</td>
                {this.props.paymentSummary.paymentReceipts.map(receipt => (
                    <td>{receipt.outstandingBalance}</td>
                ))}
            </tr>
        );
    }
}

export default PaymentSummaryRow;