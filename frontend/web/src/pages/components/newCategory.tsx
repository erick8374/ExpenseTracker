import React, { useState, useEffect } from "react";
import { Container, Table, Button, Spinner, Modal, Form } from "react-bootstrap";
import CategoryService from "../services/categoryService";
import CategoryInterface from "../interfaces/CategoryInterface"


const NewCategoriesTable: React.FC = () => {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryInterface | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await CategoryService.getCategories();
      setCategories(data || []);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenModal = (category?: CategoryInterface) => {
    setSelectedCategory(category || { id: 0, name: "", expenses: [] });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
  };

  const handleSaveCategory = async () => {
    if (!selectedCategory) return;

    try {
      if (selectedCategory.id) {
        await CategoryService.updateCategory(selectedCategory.id, selectedCategory);
      } else {
        await CategoryService.addCategory(selectedCategory);
      }
      fetchCategories();
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
    } finally {
      handleCloseModal();
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await CategoryService.deleteCategory(id);
      fetchCategories();
    } catch (error) {
      console.error("Erro ao remover categoria:", error);
    }
  };

  return (
    <Container className="mt-2">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2>Categorias</h2>
        <Button variant="success" size="sm" onClick={() => handleOpenModal()}>
          +
        </Button>
      </div>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </Spinner>
        </div>
      ) : (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
            {/* <th>Código</th> */}
            <th>Categoria</th>
            <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                {/* <td>{category.id}</td> */}
                <td>{category.name}</td>
                <td className="text-center">
                  <Button variant="warning" size="sm" onClick={() => handleOpenModal(category)}>
                  <i className="bi bi-pencil-square"></i>
                  </Button>{" "}
                  <Button variant="danger" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={handleCloseModal} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>{selectedCategory?.id ? "Editar Categoria" : "Nova Categoria"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCategoryName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome da categoria"
                value={selectedCategory?.name || ""}
                onChange={(e) =>
                  setSelectedCategory({ ...selectedCategory!, name: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveCategory}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default NewCategoriesTable;
