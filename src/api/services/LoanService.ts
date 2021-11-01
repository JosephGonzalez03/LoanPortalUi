import axios, { AxiosTransformer } from "axios";
import { loanSystemApi } from "../axios";

export type Loan = {
    id: number;
    name: string;
    interestRate: number;
    outstandingBalance: number;
    contribution: number;
    isEdited: boolean;
    isNew: boolean;
}

type LoanRequest = {
    name: string;
    interestRate: number;
    outstandingBalance: number;
    contribution: number;
}

type LoanResponse = {
    id: number;
    name: string;
    interestRate: number;
    outstandingBalance: number;
    contribution: number;
}

function loanRequestTransformation(data: Loan, headers: object): LoanRequest {
   return {
       name: data.name,
       interestRate: data.interestRate,
       outstandingBalance: data.outstandingBalance,
       contribution: data.contribution
   }
}

function loansResponseTrasnsformation(data: LoanResponse[]): Loan[] {
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

export function getLoans(userId: number): Promise<Loan[]> {
    return loanSystemApi.get(`/users/${userId}/loans`,
        {
            params: {
                orderBy: 'NAME'
            },
            transformResponse: [
                ...axios.defaults.transformResponse as AxiosTransformer[],
                loansResponseTrasnsformation
            ]
        }
    ).then(response => response.data);
}

export function createLoan(userId: number): Promise<void> {
    return loanSystemApi.post(`/users/${userId}/loans`,
        {
            transformRequest: [
                ...axios.defaults.transformRequest as AxiosTransformer[],
                loanRequestTransformation
            ]
        }
    );
}

export function updateLoan(userId: number, loanId: number): Promise<void> {
    return loanSystemApi.put(`/users/${userId}/loans/${loanId}`,
        {
            transformRequest: [
                ...axios.defaults.transformRequest as AxiosTransformer[],
                loanRequestTransformation
            ]
        }
    );
}
