import React from "react";
import { getLoans, Loan } from "../../api/services/LoanService";
import { getPaymentSummaries, PaymentSummary } from "../../api/services/PaymentService";
import { useLoans } from "../../util/providers/LoanContextProvider";
import { LoansForm } from "./components/LoansForm";
import { LoanTable } from "./components/LoanTable";
import { PaymentSummaryTable } from "./components/PaymentSummaryTable";

export function Home(): JSX.Element {
    const {dispatchLoansAction} = useLoans();
    const [paymentSummaries, setPaymentSummaries] = React.useState<PaymentSummary[]>([]);
    const [showPaymentSummaryTable, setShowPaymentSummaryTable] = React.useState<boolean>(false);
    
    React.useEffect(() => {
        getLoans(1).then(loans => dispatchLoansAction({type: "INIT", loans: loans}))
    }, [dispatchLoansAction])

    React.useEffect(() => {
        getPaymentSummaries(1).then(paymentSummaries => setPaymentSummaries(paymentSummaries));
    }, [showPaymentSummaryTable]);

    const handleSubmit = (loans: Loan[], event: React.FormEvent<HTMLFormElement>) => {
        dispatchLoansAction({type: "SUBMIT", loans: loans, event: event})
        setShowPaymentSummaryTable(true);
    };

    return (
        <div>
            <LoansForm
                onSubmit={handleSubmit}
            />
            {showPaymentSummaryTable && <PaymentSummaryTable paymentSummaries={paymentSummaries}/>}
        </div>

    );
}
