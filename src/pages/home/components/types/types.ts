import {ChangeEvent} from "react";

export type Loan = {
    id: number;
    name: string;
    interestRate: number;
    outstandingBalance: number;
    contribution: number;
}

export type PaymentSummary = {
    paymentReceipts: PaymentReceipt[];
}

type PaymentReceipt = {
    loanName: string;
    outstandingBalance: number;
    contribution: number;
}

export type State = {
    loans: Loan[]
}

type Init = {
    type: "INIT";
    loans: Loan[];
}

type AddLoan = {
    type: "ADD";
}

type RemoveLoan = {
    type: "REMOVE";
    loanId: number;
}

type EditLoan = {
    type: "EDIT";
    loanId: number;
    event: ChangeEvent<HTMLInputElement>;
}

type Reset = {
    type: "RESET";
}

export type LoanAction = AddLoan | RemoveLoan | EditLoan | Reset | Init
