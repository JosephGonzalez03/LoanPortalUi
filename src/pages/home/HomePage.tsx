import {LoanTable} from "./components/LoanTable";
import {PaymentSummaryTable} from "./components/PaymentSummaryTable";
import {HandleLoanChange, Loan} from "./components/types/types";
import {EditLoansForm} from "./components/forms/EditLoansForm";
import {useState} from "react";

export function HomePage(): JSX.Element {
    const [loans, setLoans] = useState<Loan[]>(
        [
            {
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
                contribution: 500.00
            }
        ]
    });

    // const [loan, setLoan] = useState<Loan>(
    //     {
    //         id: 1,
    //         name: 'Loan a',
    //         interestRate: 5.000,
    //         outstandingBalance: 1000.00,
    //         contribution: 100.00
    //     }
    // );

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

    const handleLoanChange: HandleLoanChange = (loanId, event) => {
        let currentLoans = loans;
        const updatedValue: string | number = event.target.value;

        // update loan object key with input updated value
        currentLoans.map((loan) => {
            if (loan.id === loanId) {
                switch (event.target.name) {
                    case "name":
                        loan.name = updatedValue;
                        break;
                    case "interestRate":
                        loan.interestRate = Number(updatedValue);
                        break;
                    case "outstandingBalance":
                        loan.outstandingBalance = Number(updatedValue);
                        break;
                    case "contribution":
                        loan.contribution = Number(updatedValue);
                        break;
                }
            }
        });

        // save updated loans array state
        setState({
            loans: currentLoans
        });
    }

    return (
        <div>
            <EditLoansForm
                loans={state.loans}
                onLoanChange={handleLoanChange}
            />
            <PaymentSummaryTable paymentSummaries={mPaymentSummaries}/>
        </div>
    );
}
