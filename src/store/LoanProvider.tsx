import React from "react";
import {LoanAction} from "../pages/home/components/types/actions"
import {Loan, LoanRequest} from "../api/services/LoanService"
import axios, {AxiosTransformer} from "axios";

type State = {
    loans: Loan[]
}

const initialState: {loans: Loan[], dispatchLoansAction: (action: LoanAction) => void} = {loans: [], dispatchLoansAction: f => f};
export const LoanContext = React.createContext(initialState);

export const useLoans = () => React.useContext(LoanContext);

export default function LoanProvider({children}: {children: React.ReactNode}): JSX.Element {
    const [state, dispatchLoansAction] = React.useReducer(loanFormReducer, {loans: []});
    const [loans, setLoans] = React.useState<Loan[]>([]);

    function loanFormReducer(state: State, action: LoanAction): State {
        let initialLoans: Loan[] = [];
        let currentLoans = state.loans;
        let modifiedLoans: Loan[] = [...currentLoans];

        switch (action.type) {
        case "INIT":
            initialLoans = [...action.loans];
            modifiedLoans = [...action.loans];
            break;
        case "RESET":
            modifiedLoans = [...initialLoans];
            break;
        case "ADD":
            let oldHighestId: number = [...currentLoans].sort((loanA, loanB) => loanB.id - loanA.id)[0].id;

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

            let userId = 1;

            modifiedLoans.forEach(loan => {

                if (loan.isEdited) {
                    updateLoan(userId, loan.id);
                }

                if (loan.isNew) {
                    createLoan(userId);
                }
            });
            break;
        }

        setLoans(modifiedLoans);
        return {loans: modifiedLoans};
    }

    return (
        <LoanContext.Provider value={{loans, dispatchLoansAction}}>
            {children}
        </LoanContext.Provider>
    )
}
