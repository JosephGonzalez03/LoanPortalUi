import React from 'react';
import LoanTable from "./LoanTable";
import PaymentSummaryTable from "../PaymentSummaryTable/PaymentSummaryTable";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loans: [
                {id: 1, name: 'Loan a', interestRate: 5.000, outstandingBalance: 1000.00, contribution: 100.00},
                {id: 2, name: 'Loan b', interestRate: 5.000, outstandingBalance: 1000.00, contribution: 100.00}
            ],
            paymentSummaries: [
                {
                    paymentReceipts: [{
                        loanName: "loan a",
                        outstandingBalance: 1000.00,
                        contribution: 100.00
                    },
                        {
                            loanName: "loan b",
                            outstandingBalance: 1000.00,
                            contribution: 100.00
                        }]
                },
                {
                    paymentReceipts: [{
                        loanName: "loan a",
                        outstandingBalance: 800.00,
                        contribution: 100.00
                    },
                        {
                            loanName: "loan b",
                            outstandingBalance: 800.00,
                            contribution: 100.00
                        }]
                }
            ]
        }
    }

    render() {
        return (
          <div>
              <LoanTable loans={this.state.loans}/>
              <PaymentSummaryTable paymentSummaries={this.state.paymentSummaries}/>
          </div>
        );
    }
}

export default Home;