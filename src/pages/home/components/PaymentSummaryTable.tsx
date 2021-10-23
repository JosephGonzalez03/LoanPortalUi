import {PaymentSummary} from "../../../api/services/PaymentService";

type PaymentSummaryTableProps = {
    paymentSummaries: PaymentSummary[];
}

export function PaymentSummaryTable({paymentSummaries}: PaymentSummaryTableProps): JSX.Element {
    const mLoanNameHeaders = paymentSummaries[0].paymentReceipts.map(receipt =>
        <th>{receipt.loanName}</th>
    );

    const mPaymentSummaryRows = paymentSummaries.map((paymentSummary, index) =>
        <PaymentSummaryRow key={index} month={index+1} paymentSummary={paymentSummary}/>
    );

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

type PaymentSummaryRowProps = {
    month: number;
    paymentSummary: PaymentSummary;
}

export function PaymentSummaryRow({month, paymentSummary}: PaymentSummaryRowProps): JSX.Element {
    return (
        <tr>
            <td>{month}</td>
            {paymentSummary.paymentReceipts.map(receipt => (
                <td>{receipt.outstandingBalance}</td>
            ))}
        </tr>
    );
}
