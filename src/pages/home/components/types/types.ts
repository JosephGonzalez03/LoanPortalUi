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
    type: "Init";
    loans: Loan[];
}

type AddLoan = {
    type: "Add";
}

type RemoveLoan = {
    type: "Remove";
    loanId: number;
}

type EditLoan = {
    type: "Edit";
    loanId: number;
    event: ChangeEvent<HTMLInputElement>;
}

type Reset = {
    type: "Reset";
}

export type LoanAction = AddLoan | RemoveLoan | EditLoan | Reset | Init
