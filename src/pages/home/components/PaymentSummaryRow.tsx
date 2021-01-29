import {PaymentSummary} from "./types/types";

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