import {paymentProcessApi} from "../axios";

export type PaymentSummary = {
    paymentReceipts: PaymentReceipt[];
}

type PaymentReceipt = {
    loanName: string;
    outstandingBalance: number;
    contribution: number;
}

export function getPaymentSummaries(userId: number): Promise<PaymentSummary[]> {
    return paymentProcessApi.get(`/users/${userId}/paymentSummaries`,
        {
            params: {
                operation: 'FORECAST',
                orderBy: 'NAME'
            }
        }
    ).then(response => response.data);
}
