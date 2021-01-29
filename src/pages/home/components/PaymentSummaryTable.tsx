import {PaymentSummary} from "./types/types";
import {PaymentSummaryRow} from "./PaymentSummaryRow";

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