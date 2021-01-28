import {LoanTable} from "./components/LoanTable";
import {PaymentSummaryTable} from "./components/PaymentSummaryTable";
import {Loan} from "./components/types/types";
import {EditLoansForm} from "./components/forms/EditLoansForm";

export function HomePage(): JSX.Element {
    const mLoans: Loan[] = [{
        id: 1,
        name: 'Loan a',
        interestRate: 5.000,
        outstandingBalance: 1000.00,
        contribution: 100.00
    },
        {
            id: 2,
            name: 'Loan b',
            interestRate: 5.000,
            outstandingBalance: 1000.00,
            contribution: 100.00
        }];

    const mPaymentSummaries = [{
        paymentReceipts: [{
            loanName: "loan a",
            outstandingBalance: 1000.00,
            contribution: 100.00
        },
            {
                loanName: "loan b",
                outstandingBalance: 1000.00,
                contribution: 100.00
            }]
    },
        {
            paymentReceipts: [{
                loanName: "loan a",
                outstandingBalance: 800.00,
                contribution: 100.00
            },
                {
                    loanName: "loan b",
                    outstandingBalance: 800.00,
                    contribution: 100.00
                }]
        }];
    return (
        <div>
            <EditLoansForm loans={mLoans}/>
            <PaymentSummaryTable paymentSummaries={mPaymentSummaries}/>
        </div>
    );
}