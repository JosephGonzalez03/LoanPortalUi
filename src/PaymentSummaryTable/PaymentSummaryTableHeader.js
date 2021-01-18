import React from 'react';

class PaymentSummaryTableHeader extends React.Component {
    render() {
        const mLoanNameHeaders = [];
        this.props.paymentSummaries[0].paymentReceipts.forEach((paymentReceipt) => {
                mLoanNameHeaders.push(
                    <th>{paymentReceipt.loanName}</th>
                );
            }
        );

        return (
            <thead>
                <tr>
                    <th>Month</th>
                    {mLoanNameHeaders}
                </tr>
            </thead>
        );

    }
}

export default PaymentSummaryTableHeader;