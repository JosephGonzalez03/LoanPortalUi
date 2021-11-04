import React from "react";
import { createLoan, getLoans, Loan, updateLoan } from "../../api/services/LoanService";
import { getPaymentSummaries, PaymentSummary } from "../../api/services/PaymentService";
import { useLoans } from "../../util/providers/LoanContextProvider";
import { LoansForm } from "./components/LoansForm";
import { PaymentSummaryTable } from "./components/PaymentSummaryTable";

export function Home(): JSX.Element {
    const {dispatchLoansAction} = useLoans();
    const [paymentSummaries, setPaymentSummaries] = React.useState<PaymentSummary[]>([]);
    const [isSubmitted, setIsSubmited] = React.useState(true);
    const [showPaymentSummaryTable, setShowPaymentSummaryTable] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (isSubmitted) {
            getLoans(1).then(loans => dispatchLoansAction({type: "INIT", loans: loans}))
            setIsSubmited(false);
        }
    }, [isSubmitted])

    React.useEffect(() => {
        getPaymentSummaries(1).then(paymentSummaries => setPaymentSummaries(paymentSummaries));
    }, [showPaymentSummaryTable]);

    const handleSubmit = (loans: Loan[], event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let userId = 1;

        loans.forEach(loan => {

            if (loan.isEdited) {
                updateLoan(userId, loan);
            }

            if (loan.isNew) {
                createLoan(userId, loan);
            }
        });
        setTimeout(() => { setIsSubmited(true) }, 300);
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
