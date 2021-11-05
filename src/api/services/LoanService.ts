import axios, { AxiosTransformer } from "axios";
import { loanSystemApi } from "../axios";

export type Loan = {
    id: number;
    name: string;
    interestRate: number;
    outstandingBalance: number;
    contribution: number;
    isEdited: boolean;
    isRemoved: boolean;
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

function loanRequestTransformation(data: Loan): LoanRequest {
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
            isRemoved: false,
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

export function createLoan(userId: number, loan: Loan): Promise<void> {
    return loanSystemApi.post(`/users/${userId}/loans`, loan,
        {
            headers: {'Content-Type': 'application/json'},
            transformRequest: [
                loanRequestTransformation,
                ...axios.defaults.transformRequest as AxiosTransformer[]
            ]
        }
    );
}

export function updateLoan(userId: number, loan: Loan): Promise<void> {
    return loanSystemApi.put(`/users/${userId}/loans/${loan.id}`, loan,
        {
            headers: {'Content-Type': 'application/json'},
            transformRequest: [
                loanRequestTransformation,
                ...axios.defaults.transformRequest as AxiosTransformer[]
            ]
        }
    );
}

export function deleteLoan(userId: number, loanId: number): Promise<void> {
    return loanSystemApi.delete(`/users/${userId}/loans/${loanId}`);
}
