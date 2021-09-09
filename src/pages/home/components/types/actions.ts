import {Loan} from "./types"

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
    event: React.ChangeEvent<HTMLInputElement>;
}

type Submit = {
    type: "SUBMIT";
    loans: Loan[];
    event: React.FormEvent<HTMLFormElement>;
}

export type LoanAction = AddLoan | RemoveLoan | EditLoan | Init | Submit
