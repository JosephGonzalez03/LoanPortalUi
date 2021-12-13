import { fireEvent, render } from "@testing-library/react";
import { Loan } from "../../../api/services/LoanService";
import LoanProvider from "../../../util/providers/LoanContextProvider";
import { LoansForm } from "./LoansForm";

test("Given loan table has no loans When add action is invoked Then return new loan in state", () => {

    const handleSubmit = (loans: Loan[], event: React.FormEvent<HTMLFormElement>) => {}

    const { getByRole, queryAllByRole } = render(
        <LoanProvider>
            <LoansForm onSubmit={handleSubmit} />
        </LoanProvider>
    );
    const addLoanButton = getByRole("button", { name: "add" });
    fireEvent.click(addLoanButton);
    const loanEntries = queryAllByRole("textbox", { name: "name" });

    expect(loanEntries.length).toStrictEqual(1);
});

test("Given loan table has one loan When remove action is invoked Then return loan with is removed true", () => {
    const handleSubmit = (loans: Loan[], event: React.FormEvent<HTMLFormElement>) => {}

    const { getByRole, queryAllByRole } = render(
        <LoanProvider>
            <LoansForm onSubmit={handleSubmit} />
        </LoanProvider>
    );

    const addLoan = getByRole("button", { name: "add" });
    fireEvent.click(addLoan);

    const deleteLoan = getByRole("button", { name: "delete" });
    fireEvent.click(deleteLoan);

    const loanEntries = queryAllByRole("textbox", { name: "name" });

    expect(loanEntries.length).toStrictEqual(0);
});

/*
test("Given loan table has one loan When edit action is invoked Then update loan field with edited values", () => {
    const handleSubmit = (loans: Loan[], event: React.FormEvent<HTMLFormElement>) => {}

    const { getByRole } = render(
        <LoanProvider>
            <LoansForm onSubmit={handleSubmit} />
        </LoanProvider>
    );

    const addLoan = getByRole("button", { name: "add" });
    fireEvent.click(addLoan);

    const loanName = getByRole("textbox", { name: "name" });
    const interestRate = getByRole("spinbutton", { name: "interestRate" });
    const outstandingBalance = getByRole("spinbutton", { name: "outstandingBalance" });
    const contribution = getByRole("spinbutton", { name: "contribution" });

    console.log(loanName);
    fireEvent.change(loanName, { target: { value: "hello" } });
    //fireEvent.change(interestRate, { target: { value: 4.00 } });

    expect(interestRate).toHaveValue(4.00);
});
*/
