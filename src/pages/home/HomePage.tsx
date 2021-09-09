import React from "react";
import {Loan, PaymentSummary, State} from "./components/types/types";
import {LoanAction} from "./components/types/actions";
import {LoanRequest, LoanResponse} from "./components/types/contracts"
import {LoanTable} from "./components/LoanTable";
import {PaymentSummaryTable} from "./components/PaymentSummaryTable";
import {LoansForm} from "./components/forms/LoansForm";
import axios, {AxiosTransformer} from "axios";
import {loanSystemApi, paymentProcessApi} from "../../configuration/RequestTemplateConfiguration";

const initialState: State = {loans: []};
export const LoanContext = React.createContext(initialState);

function loanRequestTransformation(data: Loan, headers: object): LoanRequest {
   return {
       name: data.name,
       interestRate: data.interestRate,
       outstandingBalance: data.outstandingBalance,
       contribution: data.contribution
   }
}
        
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

export function HomePage(): JSX.Element {
    const [loans, setLoans] = React.useState<Loan[]>([]);
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
            setLoans(response.data);
            dispatch({type: "INIT", loans: response.data});
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
    }, [showPaymentSummaryTable, setLoans]);

    function loanFormReducer(state: State, action: LoanAction): State {
        let currentLoans = state.loans;
        let loanCopy: Loan[] = JSON.parse(JSON.stringify(currentLoans));
        let modifiedLoans: Loan[] = JSON.parse(JSON.stringify(currentLoans));

        switch (action.type) {
            case "INIT":
               modifiedLoans = action.loans;
               break;
            case "ADD":
                let oldHighestId: number = loanCopy.sort((loanA, loanB) => loanB.id - loanA.id)[0].id;

                modifiedLoans.push({id: oldHighestId+1, name: "", interestRate: 0.000, outstandingBalance: 0.00, contribution: 0.00, isEdited: false, isNew: true});
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
                        loan.isEdited = loan.isNew? false : true;
                    }
                });
                break;
            case "SUBMIT":
                action.event.preventDefault();

                let userId = '1';

                modifiedLoans.forEach(loan => {
                    let options = {
                        transformRequest: [...axios.defaults.transformRequest as AxiosTransformer[], loanRequestTransformation]
                    }

                    let loanId = loan.id;

                    if (loan.isEdited) {
                        loanSystemApi.put(`/users/${userId}/loans/${loanId}`, options);
                    }

                    if (loan.isNew) {
                        loanSystemApi.post(`/users/${userId}/loans`, options);
                     }
                });

                setLoans(modifiedLoans);
                setShowPaymentSummaryTable(true);
                break;
        }

        return {loans: modifiedLoans};
    }

    const [state, dispatch] = React.useReducer(loanFormReducer, initialState);

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
                <LoansForm
                    loans={state.loans}
                    loanDispatcher={dispatch}
                />
                {showPaymentSummaryTable && <PaymentSummaryTable paymentSummaries={paymentSummaries}/>}
            </LoanContext.Provider>
        </div>

    );
}
