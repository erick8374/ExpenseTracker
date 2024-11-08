import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Spinner, Modal, Form } from "react-bootstrap";
import ExpenseService from "../services/expenseService";
import CategoryService from "../services/categoryService";
import ExpenseInterface from "../interfaces/ExpenseInterface"
import CategoryInterface from "../interfaces/CategoryInterface";


const NewExpensesTable: React.FC = () => {
  const [expenses, setExpenses] = useState<ExpenseInterface[]>([]);
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseInterface | null>(null);

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

  const fetchCategories = async () => {
    try {
      const data = await CategoryService.getCategories();
      setCategories(data || []);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  const handleOpenModal = (expense?: ExpenseInterface) => {
    setSelectedExpense(
      expense || { id: 0, description: "", value: 0, date: "", category: { name: "", id: 0 } }
    );
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
            Adicionar +
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
                   <i className="bi bi-pencil-square"></i>
                </Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDeleteExpense(expense.id)}>
                   <i className="bi bi-trash"></i>
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
              <Form.Label>Categoria</Form.Label>
              <Form.Select
                value={selectedExpense?.category.id || ""}
                onChange={(e) => {
                  const selectedCategory = categories.find(
                    (category) => category.id === parseInt(e.target.value)
                  );
                  setSelectedExpense({
                    ...selectedExpense!,
                    category: selectedCategory || { name: "", id: 0 },
                  });
                }}
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
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
