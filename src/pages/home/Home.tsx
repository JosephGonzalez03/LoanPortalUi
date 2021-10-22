import React from "react";
import {Loan, PaymentSummary} from "./components/types/types";
import {LoanResponse} from "./components/types/contracts"
import {LoanTable} from "./components/LoanTable";
import {PaymentSummaryTable} from "./components/PaymentSummaryTable";
import axios, {AxiosTransformer} from "axios";
import {LoansForm} from "./components/LoansForm";
import {loanSystemApi, paymentProcessApi} from "../../configuration/RequestTemplateConfiguration";
import LoanProvider, {useLoans} from "../../store/LoanProvider"

function loansResponseTrasnsformation(data: LoanResponse[]): Loan[] {
    let loans: Loan[] = data.map(loan => ({
            id: loan.id,
            name: loan.name,
            interestRate: loan.interestRate,
            outstandingBalance: loan.outstandingBalance,
            contribution: loan.contribution,
            isEdited: false,
            isNew: false
        })
    );
    
    return loans;
}

export function Home(): JSX.Element {
    const {dispatchLoansAction} = useLoans();
    const [paymentSummaries, setPaymentSummaries] = React.useState<PaymentSummary[]>([]);
    const [showPaymentSummaryTable, setShowPaymentSummaryTable] = React.useState<boolean>(false);
    
    React.useEffect(() => {
        // get loans from loan-system-api
        let options = {
            params: {
                orderBy: 'NAME'
            },
            transformResponse: [...axios.defaults.transformResponse as AxiosTransformer[], loansResponseTrasnsformation]
         };

        let userId = '1';

        loanSystemApi.get(`/users/${userId}/loans`, options).then(response => {
            dispatchLoansAction({type: "INIT", loans: response.data});
        });
    }, [])

    React.useEffect(() => {
        let options = {
            params: {
                operation: 'FORECAST',
                orderBy: 'NAME'
            }
        }

        let userId = '1'

        paymentProcessApi.get(`/users/${userId}/paymentSummaries`, options).then(response => setPaymentSummaries(response.data));
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
