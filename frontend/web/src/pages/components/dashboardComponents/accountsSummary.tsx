import React from "react";
import { Card, Button } from "react-bootstrap";
import AccountMenu from "../incomeView/accountComponents/AccountMenu";
import IncomePerAccountPieChart from "../incomeView/charts/IncomePerAccountPieChart";

const AccountSummary = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Resumo</Card.Title>
        <AccountMenu/>
        <div style={{ width: '400px', height: '400px',alignContent:"center" }}>
          <IncomePerAccountPieChart/>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AccountSummary;
