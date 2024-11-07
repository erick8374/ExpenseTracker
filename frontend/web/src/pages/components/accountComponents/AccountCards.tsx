import React from "react";
import { Card, Button } from "react-bootstrap";

interface Account {
  id: number;
  initial_income: number;
  name: string;
}

interface AccountCardProps {
  account: Account;
  // onEdit: (user: User) => void;
}

const AccountCardModal: React.FC<AccountCardProps> = ({ account }) => { //, onEdit
  return (
    <Card>
      <Card.Body>
        <Card.Title>{account.name}</Card.Title>
        <Card.Text>{account.initial_income}</Card.Text>
        {/* <Button variant="info" onClick={() => onEdit(user)}>
          Editar
        </Button> */}
      </Card.Body>
    </Card>
  );
};

export default AccountCardModal;
