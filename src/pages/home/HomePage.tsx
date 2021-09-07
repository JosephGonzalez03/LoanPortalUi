import React from "react";
import {Loan, PaymentSummary, State, LoanAction} from "./components/types/types";
import {LoanTable} from "./components/LoanTable";
import {PaymentSummaryTable} from "./components/PaymentSummaryTable";
import {EditLoansForm} from "./components/forms/EditLoansForm";
import {loanSystemApi, paymentProcessApi} from "../../configuration/RequestTemplateConfiguration";

const initialState: State = {loans: []};
export const LoanContext = React.createContext(initialState);

export function HomePage(): JSX.Element {
    const [loans, setLoans] = React.useState<Loan[]>([]);
    const [paymentSummaries, setPaymentSummaries] = React.useState<PaymentSummary[]>([]);

    React.useEffect(() => {
        // get loans from loan-system-api
        let params: object = {
            orderBy: 'NAME'
        };

        let userId = '1';

        loanSystemApi.get(`/users/${userId}/loans`, params).then(response => {
            setLoans(response.data);
            dispatch({type: "INIT", loans: response.data});
        });
    }, [])

    React.useEffect(() => {
        let params: object = {
            operation: 'FORECAST',
            orderBy: 'NAME'
        }
        let userId = '1'
        paymentProcessApi.get(`/users/${userId}/paymentSummaries`).then(response => setPaymentSummaries(response.data));
    }, [loans]);

    function buttonClickReducer(state: State, action: LoanAction): State {
        let currentLoans = state.loans;
        let loanCopy: Loan[] = JSON.parse(JSON.stringify(currentLoans));
        let modifiedLoans: Loan[] = JSON.parse(JSON.stringify(currentLoans));

        switch (action.type) {
            case "INIT":
               modifiedLoans = action.loans;
               break;
            case "ADD":
                let oldHighestId: number = loanCopy.sort((loanA, loanB) => loanB.id - loanA.id)[0].id;

                modifiedLoans.push({id: oldHighestId+1, name: "", interestRate: 0.000, outstandingBalance: 0.00, contribution: 0.00});
                break;
            case "REMOVE":
                modifiedLoans = currentLoans.filter(loan => loan.id !== action.loanId);
                break;
            case "EDIT":
                const updatedValue: string | number = action.event.target.value;

                // update loan object key with input updated value
                modifiedLoans.map((loan) => {
                    if (loan.id === action.loanId) {
                        switch (action.event.target.name) {
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
                break;
        }

        return {loans: modifiedLoans};
    }

    const [state, dispatch] = React.useReducer(buttonClickReducer, initialState);

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
            <LoanContext.Provider value={{loans}}>
                <EditLoansForm
                    loans={state.loans}
                    loanDispatcher={dispatch}
                />
                <PaymentSummaryTable paymentSummaries={paymentSummaries}/>
            </LoanContext.Provider>
        </div>

    );
}
