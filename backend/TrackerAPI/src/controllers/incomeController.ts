import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import IncomeRepository from "../repositories/incomeRepository";

export class IncomeController {
  private incomeRepository: IncomeRepository;

  constructor() {
      this.incomeRepository = new IncomeRepository(AppDataSource);
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
      const incomes = await this.incomeRepository.getAll();
      res.status(200).json(incomes);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
      const income = await this.incomeRepository.getById(parseInt(req.params.id));
      if (!income) {
          res.status(404).send('Income not found');
      } else {
          res.status(200).json(income);
      }
  };

  getByUser = async (req: Request, res: Response): Promise<void> => {
    const income = await this.incomeRepository.getByUser(parseInt(req.params.userId));
    if (!income) {
        res.status(404).send('Expenses not found');
    } else {
        res.status(200).json(income);
    }
}
  create = async (req: Request, res: Response): Promise<void> => {
      const newIncome = await this.incomeRepository.create(req.body);
      res.status(201).json({message: "Income added"});
  };

  update = async (req: Request, res: Response): Promise<void> => {
      const updatedIncome = await this.incomeRepository.update(parseInt(req.params.id), req.body);
      if (!updatedIncome) {
          res.status(404).send('Income not found');
      } else {
          res.status(200).json(updatedIncome);
      }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
      const success = await this.incomeRepository.delete(parseInt(req.params.id));
      if (!success) {
          res.status(404).send('Income not found');
      } else {
          res.status(204).send();
      }
  };
}