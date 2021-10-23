import React from "react";
import {LoanTable} from "./components/LoanTable";
import {PaymentSummaryTable} from "./components/PaymentSummaryTable";
import {LoansForm} from "./components/LoansForm";
import LoanProvider, {useLoans} from "../../util/providers/LoanContextProvider"
import {getLoans} from "../../api/services/LoanService"
import {getPaymentSummaries} from "../../api/services/PaymentService"
import {Loan} from "../../api/services/LoanService"
import {PaymentSummary} from "../../api/services/PaymentService"

export function Home(): JSX.Element {
    const {dispatchLoansAction} = useLoans();
    const [paymentSummaries, setPaymentSummaries] = React.useState<PaymentSummary[]>([]);
    const [showPaymentSummaryTable, setShowPaymentSummaryTable] = React.useState<boolean>(false);
    
    React.useEffect(() => {
        getLoans(1).then(loans => dispatchLoansAction({type: "INIT", loans: loans}))
    }, [])

    React.useEffect(() => {
        getPaymentSummaries(1).then(paymentSummaries => setPaymentSummaries(paymentSummaries));
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
