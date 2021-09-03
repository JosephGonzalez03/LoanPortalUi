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

export type HandleLoanChange = (loanId: number, event: ChangeEvent<HTMLInputElement>) => void;

type AddLoan = {
    type: "Add";
}

type RemoveLoan = {
    type: "Remove";
    loan: Loan;
}

export type Action = AddLoan | RemoveLoan

export type State = {loans: Loan[]}
