import React from 'react';
import PaymentSummaryTableHeader from "./PaymentSummaryTableHeader";
import PaymentSummaries from "./PaymentSummaries";

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

        return (
            <div>
                <span>Payments</span>
                <table>
                    <PaymentSummaryTableHeader paymentSummaries={data}/>
                    <PaymentSummaries paymentSummaries={data}/>
                </table>
            </div>
        );
    }
}

export default PaymentSummaryTable;