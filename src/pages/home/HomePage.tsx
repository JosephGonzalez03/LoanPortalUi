import React from "react";
import {Loan, LoanRequestContract, LoanResponseContract, PaymentSummary, State, LoanAction} from "./components/types/types";
import {LoanTable} from "./components/LoanTable";
import {PaymentSummaryTable} from "./components/PaymentSummaryTable";
import {EditLoansForm} from "./components/forms/EditLoansForm";
import axios, {AxiosTransformer} from "axios";
import {loanSystemApi, paymentProcessApi} from "../../configuration/RequestTemplateConfiguration";

const initialState: State = {loans: []};
export const LoanContext = React.createContext(initialState);

function loanContractRequestTransformation(data: Loan, headers: object): LoanRequestContract {
   return {
       name: data.name,
       interestRate: data.interestRate,
       outstandingBalance: data.outstandingBalance,
       contribution: data.contribution
   }
}
        
function loansContractResponseTrasnsformation(data: LoanResponseContract[]): Loan[] {
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
            transformResponse: [...axios.defaults.transformResponse as AxiosTransformer[], loansContractResponseTrasnsformation]
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
                let userId = '1';

                modifiedLoans.forEach(loan => {
                    let options = {
                        transformRequest: [...axios.defaults.transformRequest as AxiosTransformer[], loanContractRequestTransformation]
                    }

                    let loanId = loan.id;

                    if (loan.isEdited) {
                        loanSystemApi.put(`/users/${userId}/loans/${loanId}`, options);
                        console.log("editted loan submitted");
                    }

                    if (loan.isNew) {
                        loanSystemApi.post(`/users/${userId}/loans`, options);
                        console.log("new loan submitted");
                     }
                });

                setLoans(modifiedLoans);
                setShowPaymentSummaryTable(true);
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
                {showPaymentSummaryTable && <PaymentSummaryTable paymentSummaries={paymentSummaries}/>}
            </LoanContext.Provider>
        </div>

    );
}
