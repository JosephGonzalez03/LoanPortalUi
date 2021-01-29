import {Loan} from "./types/types";
import React from "react";

type LoanRowProps = {
    loan: Loan;
}

export function LoanRow({loan}: LoanRowProps): JSX.Element {
    return (
        <tr>
            <td>{loan.name}</td>
            <td>{loan.interestRate}</td>
            <td>{loan.outstandingBalance}</td>
            <td>{loan.contribution}</td>
        </tr>
    );
}