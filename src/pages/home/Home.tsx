import React from "react";
import {Loan, PaymentSummary} from "./components/types/types";
import {LoanTable} from "./components/LoanTable";
import {PaymentSummaryTable} from "./components/PaymentSummaryTable";
import {LoansForm} from "./components/LoansForm";
import LoanProvider, {useLoans} from "../../store/LoanProvider"
import {getLoans} from "../../api/services/LoanService"
import {getPaymentSummaries} from "../../api/services/PaymentService"

export function Home(): JSX.Element {
    const {dispatchLoansAction} = useLoans();
    const [paymentSummaries, setPaymentSummaries] = React.useState<PaymentSummary[]>([]);
    const [showPaymentSummaryTable, setShowPaymentSummaryTable] = React.useState<boolean>(false);
    
    React.useEffect(() => {
        // TODO: add getLoans call
    }, [])

    React.useEffect(() => {
        // TODO: add getPaymentSummaries call
    }, [showPaymentSummaryTable]);

    const handleSubmit = (loans: Loan[], event: React.FormEvent<HTMLFormElement>) => {
        dispatchLoansAction({type: "SUBMIT", loans: loans, event: event})
        setShowPaymentSummaryTable(true);
    };

    return (
        <div>
            <LoanProvider>
                <LoansForm
                    onSubmit={handleSubmit}
                />
                {showPaymentSummaryTable && <PaymentSummaryTable paymentSummaries={paymentSummaries}/>}
            </LoanProvider>
        </div>

    );
}
