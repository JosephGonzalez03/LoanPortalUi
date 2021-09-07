import {LoanTable} from "./components/LoanTable";
import {PaymentSummaryTable} from "./components/PaymentSummaryTable";
import {Loan, State, LoanAction} from "./components/types/types";
import {EditLoansForm} from "./components/forms/EditLoansForm";
import React, {useState, useReducer, useEffect} from "react";
import {loanSystemApi} from "../../configuration/RequestTemplateConfiguration";

let initialState: State = {loans: []};
export const LoanContext = React.createContext(initialState);

export function HomePage(): JSX.Element {
    const [loans, setLoans] = useState<Loan[]>([]);

    const initialState = {
        loans: loans
    };
    
    useEffect(() => {
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

    const [state, dispatch] = useReducer(buttonClickReducer, initialState);

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

    return (
        <div>
            <LoanContext.Provider value={{loans}}>
                <EditLoansForm
                    loans={state.loans}
                    loanDispatcher={dispatch}
                />
                <PaymentSummaryTable paymentSummaries={mPaymentSummaries}/>
            </LoanContext.Provider>
        </div>

    );
}
