import {PaymentSummary} from "../../pages/home/components/types/types";
import {paymentProcessApi} from "../axios";

export function getPaymentSummaries(userId: number): Promise<PaymentSummary> {
    return paymentProcessApi.get(`/users/${userId}/paymentSummaries`,
        {
            params: {
                operation: 'FORECAST',
                orderBy: 'NAME'
            }
        }
    ).then(response => response.data);
}
