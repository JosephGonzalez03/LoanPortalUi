import {Loan} from "./types/types";

type LoanEntryProps = {
    loan: Loan;
}

export function LoanEntry({loan}: LoanEntryProps) {
    return (
        <tr key={loan.id}>
            <td><input type="text" name="name" value={loan.name} /></td>
            <td><input type="number" name="interestRate" value={loan.interestRate} /></td>
            <td><input type="number" name="outstandingBalance" value={loan.outstandingBalance} /></td>
            <td><input type="number" name="contribution" value={loan.contribution} /></td>
            <td><input type="submit" name="delete" value="-"/></td>
        </tr>
    );
}