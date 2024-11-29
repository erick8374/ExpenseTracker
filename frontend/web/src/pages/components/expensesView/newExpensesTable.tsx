import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Spinner, Modal, Form } from "react-bootstrap";
import TransactionService from "../../services/transactionService";
import CategoryService from "../../services/categoryService";
import TransactionInterface from "../../interfaces/TransactionInterface"
import CategoryInterface from "../../interfaces/CategoryInterface";
import accountService from "@/pages/services/accountService";
import AccountInterface from "@/pages/interfaces/AccountInterface";


const NewExpensesTable: React.FC = () => {
  const [expenses, setExpenses] = useState<TransactionInterface[]>([]);
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<TransactionInterface | null>(null);
  const [accounts, setAccounts] = useState<AccountInterface[]>([]);


  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const data = await TransactionService.getTransactionsbyType("expense");
      setExpenses(data || []);
    } catch (error) {
      console.error("Erro ao buscar despesas:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await CategoryService.getCategoriesbyType("expense");
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
    fetchExpenses();
    fetchCategories();
    fetchAccounts();
  }, []);

  const handleOpenModal = (expense?: TransactionInterface) => {
    setSelectedExpense(
      expense || { id: 0, description: "", amount: 0, date: "", category: { name: "", id: 0 },user:1, account:{ name: "", id: 0 }, type:"expense" }
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
      const expenseToSave = {
        ...selectedExpense,
        category: selectedExpense.category.id, 
        account: selectedExpense.account.id, 
        type: "expense"
      };
  
      if (selectedExpense.id) {
        await TransactionService.updateTransaction(selectedExpense.id, expenseToSave);
      } else {
        await TransactionService.addTransaction(expenseToSave);
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
      await TransactionService.deleteTransaction(id);
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
              <td>{expense.amount}</td>
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
                value={selectedExpense?.amount || ""}
                onChange={(e) =>
                  setSelectedExpense({ ...selectedExpense!, amount: parseFloat(e.target.value) })
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
                    const selectedCategoryId = parseInt(e.target.value); // extrair apenas o ID
                    const selectedCategory = categories.find(
                        (category) => category.id === selectedCategoryId
                    );
                    setSelectedExpense({
                        ...selectedExpense!,
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
            <Form.Group className="mb-3" controlId="formAccount">
              <Form.Label>Conta</Form.Label>
              <Form.Select
                value={selectedExpense?.account.id || ""}
                onChange={(e) => {
                    const selectedAccountId = parseInt(e.target.value); // extrair apenas o ID
                    const selectedAccount = accounts.find(
                        (account) => account.id === selectedAccountId
                    );
                    setSelectedExpense({
                        ...selectedExpense!,
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
