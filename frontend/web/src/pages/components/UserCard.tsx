import React from "react";
import { Card, Button } from "react-bootstrap";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
}

const UserCardModal: React.FC<UserCardProps> = ({ user, onEdit }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <Card.Text>{user.email}</Card.Text>
        <Button variant="info" onClick={() => onEdit(user)}>
          Editar
        </Button>
      </Card.Body>
    </Card>
  );
};

export default UserCardModal;
