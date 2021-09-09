export type LoanRequestContract = {
    name: string;
    interestRate: number;
    outstandingBalance: number;
    contribution: number;
}

export type LoanResponseContract = {
    id: number;
    name: string;
    interestRate: number;
    outstandingBalance: number;
    contribution: number;
}

