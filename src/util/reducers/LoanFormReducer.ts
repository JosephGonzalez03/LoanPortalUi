import { Loan } from "../../api/services/LoanService"

type Init = {
    type: "INIT";
    loans: Loan[];
}

type Reset = {
    type: "RESET";
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

export type LoanAction = AddLoan | RemoveLoan | EditLoan | Init | Reset

const loadInitialLoans = () => {
    let storedLoans: string = localStorage.getItem("initialLoans") == null?
        "" :
        localStorage.getItem("initialLoans") as string;

    return JSON.parse(storedLoans);
}

export default function loanFormReducer(loans: Loan[], action: LoanAction): Loan[] {
    let currentLoans: Loan[] = loans;
    let modifiedLoans: Loan[] = [...currentLoans];

    switch (action.type) {
    case "INIT":
        localStorage.setItem("initialLoans", JSON.stringify(action.loans));
        modifiedLoans = [...action.loans];
        break;
    case "RESET":
        modifiedLoans = [...loadInitialLoans()];
        break;
    case "ADD":
        let oldHighestId: number = currentLoans.length === 0?
            0 :
            [...currentLoans].sort((loanA, loanB) => loanB.id - loanA.id)[0].id;

        modifiedLoans.push(
            {
                id: oldHighestId+1,
                name: "",
                interestRate: 0.000,
                outstandingBalance: 0.00,
                contribution: 0.00,
                isEdited: false,
                isRemoved: false,
                isNew: true
            }
        );
        break;
    case "REMOVE":
        modifiedLoans.forEach(loan => {
            if (loan.id === action.loanId) {
                loan.isRemoved = true
            }
        });

        break;
    case "EDIT":
        const updatedKey: string | null = action.event.target.getAttribute("aria-label");
        const updatedValue: string | number = action.event.target.value;

        // update loan object key with input updated value
        modifiedLoans.forEach((loan) => {
            if (loan.id === action.loanId) {
                switch (updatedKey) {
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
    }

    return modifiedLoans;
}
