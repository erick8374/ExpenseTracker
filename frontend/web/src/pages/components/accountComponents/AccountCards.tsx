import React from "react";
import { Card, Button } from "react-bootstrap";

interface Account {
  id: number;
  total_income: number;
  name: string;
}

interface AccountCardProps {
  account: Account;
}

const AccountCardModal: React.FC<AccountCardProps> = ({ account }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{account.name}</Card.Title>
        <Card.Text>{"R$ "+account.total_income}</Card.Text>

      </Card.Body>
    </Card>
  );
};

export default AccountCardModal;
