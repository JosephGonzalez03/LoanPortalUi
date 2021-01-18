import React from 'react';

class PaymentSummaries extends React.Component {
    render() {
        const mPaymentSummaries = this.props.paymentSummaries.map((paymentSummary, index) => (
            <tr>
                <td>{index + 1}</td>
                {paymentSummary.paymentReceipts.map(receipt => (
                    <td>{receipt.outstandingBalance}</td>
                ))}
            </tr>
        ));

        return (
            <tbody>
                {mPaymentSummaries}
            </tbody>
        );
    }
}

export default PaymentSummaries;