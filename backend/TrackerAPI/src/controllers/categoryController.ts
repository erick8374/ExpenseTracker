import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import CategoryRepository from "../repositories/categoryRepository";

export class CategoryController {
  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository(AppDataSource);
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const { type } = req.query;

      if (type && !['income', 'expense'].includes(type as string)) {
        res.status(400).json({ message: "Tipo inválido. Use 'income' ou 'expense'." });
        return;
      }

      const categories = type
        ? await this.categoryRepository.getByType(type as 'income' | 'expense')
        : await this.categoryRepository.getAll();

      if (!categories || categories.length === 0) {
        res.status(404).json({ message: "Nenhuma categoria encontrada." });
        return;
      }

      res.status(200).json(categories);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: "ID inválido." });
        return;
      }

      const category = await this.categoryRepository.getById(id);
      if (!category) {
        res.status(404).json({ message: "Categoria não encontrada." });
        return;
      }

      res.status(200).json(category);
    } catch (error) {
      console.error("Erro ao buscar categoria por ID:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  };

  getByType = async (req: Request, res: Response): Promise<void> => {
    try {
      const { type } = req.params;

      if (!['income', 'expense'].includes(type)) {
        res.status(400).json({ message: "Tipo inválido. Use 'income' ou 'expense'." });
        return;
      }

      const categories = await this.categoryRepository.getByType(type as 'income' | 'expense');

      if (!categories || categories.length === 0) {
        res.status(404).json({ message: "Nenhuma categoria encontrada." });
        return;
      }

      res.status(200).json(categories);
    } catch (error) {
      console.error("Erro ao buscar categorias por tipo:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, type } = req.body;

      if (!name || !type || !['income', 'expense'].includes(type)) {
        res.status(400).json({ message: "Dados inválidos. Informe 'name' e 'type' ('income' ou 'expense')." });
        return;
      }

      const newCategory = await this.categoryRepository.create({ name, type });

      res.status(201).json({
        message: "Categoria criada com sucesso.",
        category: newCategory,
      });
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const { name, type } = req.body;

      if (isNaN(id) || (!name && !type)) {
        res.status(400).json({ message: "Dados inválidos. Informe um ID válido e ao menos um campo para atualização." });
        return;
      }

      if (type && !['income', 'expense'].includes(type)) {
        res.status(400).json({ message: "Tipo inválido. Use 'income' ou 'expense'." });
        return;
      }

      const updatedCategory = await this.categoryRepository.update(id, { name, type });

      if (!updatedCategory) {
        res.status(404).json({ message: "Categoria não encontrada." });
        return;
      }

      res.status(200).json({
        message: "Categoria atualizada com sucesso.",
        category: updatedCategory,
      });
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({ message: "ID inválido." });
        return;
      }

      const success = await this.categoryRepository.delete(id);

      if (!success) {
        res.status(404).json({ message: "Categoria não encontrada." });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  };
}
