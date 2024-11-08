import React from "react"
import { Form, Button } from "react-bootstrap"
import UserInterface from "../interfaces/UserInterface"

interface UserFormProps {
  user: UserInterface
  onChange: (user: UserInterface) => void
  onSubmit: () => void
  onCancel: () => void
}

const UserForm: React.FC<UserFormProps> = ({
  user,
  onChange,
  onSubmit,
  onCancel,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onChange({ ...user, [name]: value })
  }

  return (
    <Form>
      <Form.Group controlId="formName">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Digite o nome"
          value={user.name}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formEmail" className="mt-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Digite o email"
          value={user.email}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formPassword" className="mt-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Digite o password"
          value={user.password}
          onChange={handleInputChange}
        />
      </Form.Group>
      <div className="d-flex justify-content-end mt-4">
        <Button variant="secondary" onClick={onCancel} className="me-2">
          Cancelar
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          {user.id ? "Salvar Alterações" : "Adicionar Usuário"}
        </Button>
      </div>
    </Form>
  )
}

export default UserForm
