import React from 'react';

class PaymentSummaryRow extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.index + 1}</td>
                {this.props.paymentSummary.paymentReceipts.map(receipt => (
                    <td>{receipt.outstandingBalance}</td>
                ))}
            </tr>
        );
    }
}

export default PaymentSummaryRow;