import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Spinner, Modal, Form } from "react-bootstrap";
import AccountService from "../services/accountService";
import AccountInterface from "../interfaces/AccountInterface"


const NewAccountsTable: React.FC = () => {
  const [accounts, setAccounts] = useState<AccountInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<AccountInterface | null>(null);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const data = await AccountService.getAccounts();
      setAccounts(data || []);
    } catch (error) {
      console.error("Erro ao buscar contas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleOpenModal = (account?: AccountInterface) => {
    setSelectedAccount(account || { id: 0, name: "",description:"", initial_income: 0,user:1 });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAccount(null);
  };

  const handleSaveAccount = async () => {
    if (!selectedAccount) return;

    try {
      if (selectedAccount.id) {
        await AccountService.updateAccount(selectedAccount.id, selectedAccount);
      } else {
        await AccountService.addAccount(selectedAccount);
      }
      fetchAccounts();
    } catch (error) {
      console.error("Erro ao salvar conta:", error);
    } finally {
      handleCloseModal();
    }
  };

  const handleDeleteAccount = async (id: number) => {
    try {
      await AccountService.deleteAccount(id);
      fetchAccounts();
    } catch (error) {
      console.error("Erro ao remover conta:", error);
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
          <h1>Contas</h1>
        </Col>
        <Col xs="auto">
          <Button variant="success" onClick={() => handleOpenModal()}>
            Cadastrar <i className="bi bi-plus"></i>
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.name}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleOpenModal(account)}>
                   <i className="bi bi-pencil-square"></i>
                </Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDeleteAccount(account.id)}>
                   <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedAccount?.id ? "Editar Conta" : "Adicionar Conta"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome da conta"
                value={selectedAccount?.name || ""}
                onChange={(e) =>
                  setSelectedAccount({ ...selectedAccount!, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descrição"
                value={selectedAccount?.description || ""}
                onChange={(e) =>
                  setSelectedAccount({ ...selectedAccount!, description: e.target.value })
                }
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formInitialIncome">
              <Form.Label>Valor inicial</Form.Label>
              <Form.Control
                type="number"
                value={selectedAccount?.initial_income ||0}
                onChange={(e) =>
                  setSelectedAccount({ ...selectedAccount!, initial_income: parseFloat(e.target.value) })
                }
              />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveAccount}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default NewAccountsTable;
