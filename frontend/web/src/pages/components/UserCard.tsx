import React from "react";
import { Card, Button } from "react-bootstrap";
import UserInterface from "../interfaces/UserInterface";

interface UserCardProps {
  user: UserInterface;
  // onEdit: (user: User) => void;
}

const UserCardModal: React.FC<UserCardProps> = ({ user }) => { //, onEdit
  return (
    <Card>
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <Card.Text>{user.email}</Card.Text>
        {/* <Button variant="info" onClick={() => onEdit(user)}>
                   <i className="bi bi-pencil-square"></i>
        </Button> */}
      </Card.Body>
    </Card>
  );
};

export default UserCardModal;
