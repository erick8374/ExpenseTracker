import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Spinner, Modal, Form } from "react-bootstrap";
import ExpenseService from "../services/expenseService";

interface Expense {
  id: number;
  description: string;
  value: number;
  date: string;
  category:string;
}

const NewExpensesTable: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const data = await ExpenseService.getExpenses();
      setExpenses(data || []);
    } catch (error) {
      console.error("Erro ao buscar despesas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleOpenModal = (expense?: Expense) => {
    setSelectedExpense(expense || { id: 0, description: "", value: 0, date: "",category:"" });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedExpense(null);
  };

  const handleSaveExpense = async () => {
    if (!selectedExpense) return;

    try {
      if (selectedExpense.id) {
        await ExpenseService.updateExpense(selectedExpense.id, selectedExpense);
      } else {
        await ExpenseService.addExpense(selectedExpense);
      }
      fetchExpenses();
    } catch (error) {
      console.error("Erro ao salvar despesa:", error);
    } finally {
      handleCloseModal();
    }
  };

  const handleDeleteExpense = async (id: number) => {
    try {
      await ExpenseService.deleteExpense(id);
      fetchExpenses();
    } catch (error) {
      console.error("Erro ao remover despesa:", error);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h1>Lista de Despesas</h1>
        </Col>
        <Col xs="auto">
        <Button variant="success" onClick={() => handleOpenModal()}>
            Adicionar
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Data</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.id}</td>
              <td>{expense.description}</td>
              <td>{expense.value}</td>
              <td>{expense.date}</td>
              <td>{expense.category.name}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleOpenModal(expense)}>
                  Editar
                </Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDeleteExpense(expense.id)}>
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedExpense?.id ? "Editar Despesa" : "Adicionar Despesa"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descrição"
                value={selectedExpense?.description || ""}
                onChange={(e) =>
                  setSelectedExpense({ ...selectedExpense!, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAmount">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="number"
                placeholder="Valor"
                value={selectedExpense?.value || ""}
                onChange={(e) =>
                  setSelectedExpense({ ...selectedExpense!, value: parseFloat(e.target.value) })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Data</Form.Label>
              <Form.Control
                type="date"
                value={selectedExpense?.date || ""}
                onChange={(e) => setSelectedExpense({ ...selectedExpense!, date: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={selectedExpense?.category.name || ""}
                onChange={(e) => setSelectedExpense({ ...selectedExpense!, category: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveExpense}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default NewExpensesTable;
