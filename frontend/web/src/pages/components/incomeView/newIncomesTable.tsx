import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Spinner, Modal, Form } from "react-bootstrap";
import TransactionService from "../../services/transactionService";
import CategoryService from "@/pages/services/categoryService";
import TransactionInterface from "../../interfaces/TransactionInterface"
import CategoryInterface from "@/pages/interfaces/CategoryInterface";
import accountService from "@/pages/services/accountService";
import AccountInterface from "@/pages/interfaces/AccountInterface";

const NewIncomesTable: React.FC = () => {
  const [incomes, setIncomes] = useState<TransactionInterface[]>([]);
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [accounts, setAccounts] = useState<AccountInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState<TransactionInterface | null>(null);

  const fetchIncomes = async () => {
    setLoading(true);
    try {
      const data = await TransactionService.getTransactionsbyType("income");
      setIncomes(data || []);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
    } finally {
      setLoading(false);
    }
  };


  const fetchCategories = async () => {
    try {
      const data = await CategoryService.getCategoriesbyType("income");
      setCategories(data || []);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  const fetchAccounts = async () => {
    try {
      const data = await accountService.getAccounts();
      setAccounts(data || []);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  useEffect(() => {
    fetchIncomes();
    fetchCategories();
    fetchAccounts();
  }, []);

  const handleOpenModal = (income?: TransactionInterface) => {
    setSelectedIncome(income || { id: 0, description: "", amount: 0, date: "", category: { name: "", id: 0 },user:1, account:{ name: "", id: 0 },type:"income"} );
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedIncome(null);
  };

  const handleSaveIncome = async () => {
    if (!selectedIncome) return;

    try {
      const incomeToSave = {
        ...selectedIncome,
        category: selectedIncome.category.id, 
        account: selectedIncome.account.id, 
        type: "income"
      };
      if (incomeToSave.id) {
        await TransactionService.updateTransaction(incomeToSave.id, incomeToSave);
      } else {
        await TransactionService.addTransaction(incomeToSave);
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
      await TransactionService.deleteTransaction(id);
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
          <Button variant="success" onClick={() => handleOpenModal()}>
            Adicionar <i className="bi bi-plus"></i>
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
              <td>{income.amount}</td>
              <td>{income.date}</td>
              <td>{income.account.id}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleOpenModal(income)}>
                 <i className="bi bi-pencil-square"></i>
                </Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDeleteIncome(income.id)}>
                   <i className="bi bi-trash"></i>
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
                value={selectedIncome?.amount || ""}
                onChange={(e) =>
                  setSelectedIncome({ ...selectedIncome!, amount: parseFloat(e.target.value) })
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
              <Form.Select
                value={selectedIncome?.account.id || ""}
                onChange={(e) => {
                    const selectedAccountId = parseInt(e.target.value); // extrair apenas o ID
                    const selectedAccount = accounts.find(
                        (account) => account.id === selectedAccountId
                    );
                    setSelectedIncome({
                        ...selectedIncome!,
                        account: { id: selectedAccountId, name: selectedAccount ? selectedAccount.name : "" },
                    });
                }}
            >
                <option value="">Selecione uma conta</option>
                {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                        {account.name}
                    </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Categoria</Form.Label>
              <Form.Select
                value={selectedIncome?.category.id || ""}
                onChange={(e) => {
                    const selectedCategoryId = parseInt(e.target.value); // extrair apenas o ID
                    const selectedCategory = categories.find(
                        (category) => category.id === selectedCategoryId
                    );
                    setSelectedIncome({
                        ...selectedIncome!,
                        category: { id: selectedCategoryId, name: selectedCategory ? selectedCategory.name : "" },
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
          <Button variant="primary" onClick={handleSaveIncome}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default NewIncomesTable;