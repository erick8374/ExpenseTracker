import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import TransactionRepository from "../repositories/transactionRepository";
import CategoryRepository from "../repositories/categoryRepository";
import UserRepository from "../repositories/userRepository";
import Transaction from "../entities/Transaction";

export class TransactionController {
  private transactionRepository: TransactionRepository;

  constructor() {
      this.transactionRepository = new TransactionRepository(AppDataSource);
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    const { type } = req.query; 

    try {
      let transactions;
      if (type && ['income', 'expense'].includes(type as string)) {
        transactions = await this.transactionRepository.getByType(type as 'income' | 'expense');
      } else {
        transactions = await this.transactionRepository.getAll();
      }
      if (!transactions || transactions.length === 0) {
        res.status(404).send('Nenhuma transação encontrada');
      } else {
        res.status(200).json(transactions);
      }
    } catch (error) {
      res.status(500).send('Erro ao buscar transações');
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
      const transaction = await this.transactionRepository.getById(parseInt(req.params.id));
      if (!transaction) {
          res.status(404).send('Transação não encontrada');
      } else {
          res.status(200).json(transaction);
      }
  };

  getByUser = async (req: Request, res: Response): Promise<void> => {
    const transaction = await this.transactionRepository.getByUser(parseInt(req.params.userId));
    if (!transaction) {
        res.status(404).send('Transações não encontradas');
    } else {
        res.status(200).json(transaction);
    }
    }
    getByType= async (req: Request, res: Response): Promise<void> => {
        const transaction = await this.transactionRepository.getByType(req.params.type);
        if (!transaction) {
            res.status(404).send('Transações não encontradas');
        } else {
            res.status(200).json(transaction);
        }
    };

    getByCategory = async (req: Request, res: Response): Promise<void> => {
        const transaction = await this.transactionRepository.getByCategory(parseInt(req.params.categoryId));
        if (!transaction) {
            res.status(404).send('TTransações não encontradas');
        } else {
            res.status(200).json(transaction);
        }
    }

  create = async (req: Request, res: Response) => {
    const transactionRepository: TransactionRepository = new TransactionRepository(AppDataSource)        
    const userRepository: UserRepository = new UserRepository(AppDataSource)
    const categoryRepository: CategoryRepository = new CategoryRepository(AppDataSource)

    const userId = req.body.user
    const categoryId = req.body.category

    const user = await userRepository.getById(userId);
    if(!user) {
        res.status(404).json({message: "Usuário inválido"})
    }

    const category = await categoryRepository.getById(categoryId);
    if(!category) {
        res.status(404).json({message: "Categoria inválida"})
    }

    const transaction = new Transaction()
    transaction.description = req.body.description,
    transaction.amount = req.body.amount,
    transaction.user = user,
    transaction.category = category,
    transaction.date = req.body.date

    const newTransaction = this.transactionRepository.create(transaction)
    res.status(201).json(newTransaction);
}

  update = async (req: Request, res: Response): Promise<void> => {
      const updatedTransaction = await this.transactionRepository.update(parseInt(req.params.id), req.body);
      if (!updatedTransaction) {
          res.status(404).send('Transação não encontrada');
      } else {
          res.status(200).json(updatedTransaction);
      }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
      const success = await this.transactionRepository.delete(parseInt(req.params.id));
      if (!success) {
          res.status(404).send('Transação não encontrada');
      } else {
          res.status(204).send();
      }
  };
}