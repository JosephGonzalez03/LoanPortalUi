import React from 'react';
import PaymentSummaryRow from "./PaymentSummaryRow";

class PaymentSummaryTable extends React.Component {
    render() {
        const mLoanNameHeaders = this.props.paymentSummaries[0].paymentReceipts.map(receipt =>
            <th>{receipt.loanName}</th>
        );

        const mPaymentSummaryRows = this.props.paymentSummaries.map((paymentSummary, index) => (
            <tr>
                <PaymentSummaryRow key={index} month={index+1} paymentSummary={paymentSummary} />
            </tr>
        ));

        return (
            <div>
                <span>Payments</span>
                <table>
                    <thead>
                        <tr>
                            <th>Month</th>
                            {mLoanNameHeaders}
                        </tr>
                    </thead>
                    <tbody>
                        {mPaymentSummaryRows}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default PaymentSummaryTable;