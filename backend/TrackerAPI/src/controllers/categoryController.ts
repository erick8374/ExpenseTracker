import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import CategoryRepository from "../repositories/categoryRepository";

export class CategoryController {
  private categoryRepository: CategoryRepository;

  constructor() {
      this.categoryRepository = new CategoryRepository(AppDataSource);
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    const { type } = req.query; 

    try {
      let categories;
      if (type && ['income', 'expense'].includes(type as string)) {
        categories = await this.categoryRepository.getByType(type as 'income' | 'expense');
      } else {
        categories = await this.categoryRepository.getAll();
      }
      if (!categories || categories.length === 0) {
        res.status(404).send('Nenhuma categoria encontrada');
      } else {
        res.status(200).json(categories);
      }
    } catch (error) {
      res.status(500).send('Erro ao buscar categorias');
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
      const category = await this.categoryRepository.getById(parseInt(req.params.id));
      if (!category) {
          res.status(404).send('Categoria não encontrada');
      } else {
          res.status(200).json(category);
      }
  };
  getByType = async (req: Request, res: Response): Promise<void> => {
    const category = await this.categoryRepository.getByType(req.params.type);
    if (!category) {
        res.status(404).send('Categoria não encontrada');
    } else {
        res.status(200).json(category);
    }
};
  create = async (req: Request, res: Response): Promise<void> => {
      const newCategory = await this.categoryRepository.create(req.body);
      res.status(201).json({message: "Categoria adicionada"});
  };

  update = async (req: Request, res: Response): Promise<void> => {
      const updatedCategory = await this.categoryRepository.update(parseInt(req.params.id), req.body);
      if (!updatedCategory) {
          res.status(404).send('Categoria não encontrada');
      } else {
          res.status(200).json(updatedCategory);
      }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
      const success = await this.categoryRepository.delete(parseInt(req.params.id));
      if (!success) {
          res.status(404).send('Categoria não encontrada');
      } else {
          res.status(204).send();
      }
  };
}