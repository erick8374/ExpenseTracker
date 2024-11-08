import React from "react";
import { Card, Button } from "react-bootstrap";
import AccountInterface from "../../interfaces/AccountInterface"

interface AccountCardProps {
  account: AccountInterface;
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
