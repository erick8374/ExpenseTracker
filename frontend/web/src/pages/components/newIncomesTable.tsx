import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Spinner, Modal, Form } from "react-bootstrap";
import IncomeService from "../services/incomeService";

interface Income {
  id: number;
  description: string;
  value: number;
  date: string;
  account: string;
}

const NewIncomesTable: React.FC = () => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);

  const fetchIncomes = async () => {
    setLoading(true);
    try {
      const data = await IncomeService.getIncomes();
      setIncomes(data || []);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const handleOpenModal = (income?: Income) => {
    setSelectedIncome(income || { id: 0, description: "", value: 0, date: "",  account: "" });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedIncome(null);
  };

  const handleSaveIncome = async () => {
    if (!selectedIncome) return;

    try {
      if (selectedIncome.id) {
        await IncomeService.updateIncome(selectedIncome.id, selectedIncome);
      } else {
        await IncomeService.addIncome(selectedIncome);
      }
      fetchIncomes();
    } catch (error) {
      console.error("Erro ao salvar receita:", error);
    } finally {
      handleCloseModal();
    }
  };

  const handleDeleteIncome = async (id: number) => {
    try {
      await IncomeService.deleteIncome(id);
      fetchIncomes();
    } catch (error) {
      console.error("Erro ao remover receita:", error);
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
          <h1>Lista de Receitas</h1>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={() => handleOpenModal()}>
            Adicionar Receita
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
            <th>Conta</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {incomes.map((income) => (
            <tr key={income.id}>
              <td>{income.id}</td>
              <td>{income.description}</td>
              <td>{income.value}</td>
              <td>{income.date}</td>
              <td>{income.account.name}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleOpenModal(income)}>
                  Editar
                </Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDeleteIncome(income.id)}>
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedIncome?.id ? "Editar Receita" : "Adicionar Receita"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome da receita"
                value={selectedIncome?.description || ""}
                onChange={(e) =>
                  setSelectedIncome({ ...selectedIncome!, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAmount">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="number"
                placeholder="Valor"
                value={selectedIncome?.value || ""}
                onChange={(e) =>
                  setSelectedIncome({ ...selectedIncome!, value: parseFloat(e.target.value) })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Data</Form.Label>
              <Form.Control
                type="date"
                value={selectedIncome?.date || ""}
                onChange={(e) => setSelectedIncome({ ...selectedIncome!, date: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAccount">
              <Form.Label>Conta</Form.Label>
              <Form.Control
                type="text"
                value={selectedIncome?.account.name || ""}
                onChange={(e) => setSelectedIncome({ ...selectedIncome!, account: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveIncome}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default NewIncomesTable;