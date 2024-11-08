import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import CategoryRepository from "../repositories/categoryRepository";

export class CategoryController {
  private categoryRepository: CategoryRepository;

  constructor() {
      this.categoryRepository = new CategoryRepository(AppDataSource);
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
      const categories = await this.categoryRepository.getAll();
      res.status(200).json(categories);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
      const category = await this.categoryRepository.getById(parseInt(req.params.id));
      if (!category) {
          res.status(404).send('Category not found');
      } else {
          res.status(200).json(category);
      }
  };

  create = async (req: Request, res: Response): Promise<void> => {
      const newCategory = await this.categoryRepository.create(req.body);
      res.status(201).json({message: "Category added"});
  };

  update = async (req: Request, res: Response): Promise<void> => {
      const updatedCategory = await this.categoryRepository.update(parseInt(req.params.id), req.body);
      if (!updatedCategory) {
          res.status(404).send('Category not found');
      } else {
          res.status(200).json(updatedCategory);
      }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
      const success = await this.categoryRepository.delete(parseInt(req.params.id));
      if (!success) {
          res.status(404).send('Category not found');
      } else {
          res.status(204).send();
      }
  };
}