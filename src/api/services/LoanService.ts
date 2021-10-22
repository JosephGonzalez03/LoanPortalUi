import axios, {AxiosTransformer} from "axios";
import {loanSystemApi} from "../axios";
import {Loan} from "../../pages/home/components/types/types"

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
            transformResponse: [...axios.defaults.transformResponse as AxiosTransformer[], loansResponseTrasnsformation]
        }
    ).then(response => response.data);
}
