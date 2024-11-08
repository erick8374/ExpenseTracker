import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import ExpenseRepository from "../repositories/expenseRepository";
import CategoryRepository from "../repositories/categoryRepository";
import UserRepository from "../repositories/userRepository";
import Expense from "../entities/Expense";

export class ExpenseController {
  private expenseRepository: ExpenseRepository;

  constructor() {
      this.expenseRepository = new ExpenseRepository(AppDataSource);
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
      const expenses = await this.expenseRepository.getAll();
      res.status(200).json(expenses);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
      const expense = await this.expenseRepository.getById(parseInt(req.params.id));
      if (!expense) {
          res.status(404).send('Expense not found');
      } else {
          res.status(200).json(expense);
      }
  };

  getByUser = async (req: Request, res: Response): Promise<void> => {
    const expense = await this.expenseRepository.getByUser(parseInt(req.params.userId));
    if (!expense) {
        res.status(404).send('Expenses not found');
    } else {
        res.status(200).json(expense);
    }
}
    getByCategory = async (req: Request, res: Response): Promise<void> => {
        const expense = await this.expenseRepository.getByCategory(parseInt(req.params.categoryId));
        if (!expense) {
            res.status(404).send('Expenses not found');
        } else {
            res.status(200).json(expense);
        }
    }

  create = async (req: Request, res: Response) => {
    const expenseRepository: ExpenseRepository = new ExpenseRepository(AppDataSource)        
    const userRepository: UserRepository = new UserRepository(AppDataSource)
    const categoryRepository: CategoryRepository = new CategoryRepository(AppDataSource)

    const userId = req.body.user
    const categoryId = req.body.category

    const user = await userRepository.getById(userId);
    if(!user) {
        res.status(404).json({message: "User not found"})
    }

    const category = await categoryRepository.getById(categoryId);
    if(!category) {
        res.status(404).json({message: "Category not found "})
    }

    const expense = new Expense()
    expense.description = req.body.description,
    expense.value = req.body.value,
    expense.user = user,
    expense.category = category,
    expense.date = req.body.date

    const newExpense = this.expenseRepository.create(expense)
    res.status(201).json(newExpense);
}

  update = async (req: Request, res: Response): Promise<void> => {
      const updatedExpense = await this.expenseRepository.update(parseInt(req.params.id), req.body);
      if (!updatedExpense) {
          res.status(404).send('Expense not found');
      } else {
          res.status(200).json(updatedExpense);
      }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
      const success = await this.expenseRepository.delete(parseInt(req.params.id));
      if (!success) {
          res.status(404).send('Expense not found');
      } else {
          res.status(204).send();
      }
  };
}