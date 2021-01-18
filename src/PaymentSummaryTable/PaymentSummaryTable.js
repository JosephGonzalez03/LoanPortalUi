import React from 'react';
import PaymentSummaryRow from "./PaymentSummaryRow";

class PaymentSummaryTable extends React.Component {
    render() {
        const data = [{
                paymentReceipts: [{
                    loanName: "loan a",
                    outstandingBalance: 1000.00,
                    contribution: 100.00
                },
                {
                    loanName: "loan b",
                    outstandingBalance: 1000.00,
                    contribution: 100.00
                }]
            },
            {
                paymentReceipts: [{
                    loanName: "loan a",
                    outstandingBalance: 800.00,
                    contribution: 100.00
                },
                    {
                        loanName: "loan b",
                        outstandingBalance: 800.00,
                        contribution: 100.00
                    }]
            }];
        const mLoanNameHeaders = data[0].paymentReceipts.map(receipt =>
            <th>{receipt.loanName}</th>
        );

        const mPaymentSummaryRows = data.map((paymentSummary, index) => (
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