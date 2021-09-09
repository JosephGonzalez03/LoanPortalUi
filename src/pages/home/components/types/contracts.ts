export type LoanRequest = {
    name: string;
    interestRate: number;
    outstandingBalance: number;
    contribution: number;
}

export type LoanResponse = {
    id: number;
    name: string;
    interestRate: number;
    outstandingBalance: number;
    contribution: number;
}

