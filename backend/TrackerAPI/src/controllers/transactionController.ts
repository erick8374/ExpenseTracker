import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import TransactionRepository from "../repositories/transactionRepository";
import CategoryRepository from "../repositories/categoryRepository";
import UserRepository from "../repositories/userRepository";
import AccountRepository from "../repositories/accountRepository";
import Transaction from "../entities/Transaction";

export class TransactionController {
  private transactionRepository: TransactionRepository;
  private userRepository: UserRepository;
  private categoryRepository: CategoryRepository;
  private accountRepository: AccountRepository;

  constructor() {
    this.transactionRepository = new TransactionRepository(AppDataSource);
    this.userRepository = new UserRepository(AppDataSource);
    this.categoryRepository = new CategoryRepository(AppDataSource);
    this.accountRepository = new AccountRepository(AppDataSource);
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    const { type } = req.query;

    try {
      let transactions;
      if (type && ["income", "expense"].includes(type as string)) {
        transactions = await this.transactionRepository.getByType(type as "income" | "expense");
      } else {
        transactions = await this.transactionRepository.getAll();
      }

      if (!transactions) {
        res.status(404).json({ message: "Nenhuma transação encontrada" });
      } else {
        res.status(200).json(transactions);
      }
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
      res.status(500).json({ message: "Erro ao buscar transações" });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: "ID inválido" });
        return;
      }

      const transaction = await this.transactionRepository.getById(id);
      if (!transaction) {
        res.status(404).json({ message: "Transação não encontrada" });
      } else {
        res.status(200).json(transaction);
      }
    } catch (error) {
      console.error("Erro ao buscar transação:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };

  getByUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        res.status(400).json({ message: "ID do usuário inválido" });
        return;
      }

      const transactions = await this.transactionRepository.getByUser(userId);
      if (!transactions) {
        res.status(404).json({ message: "Transações não encontradas para o usuário" });
      } else {
        res.status(200).json(transactions);
      }
    } catch (error) {
      console.error("Erro ao buscar transações por usuário:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };

  getByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      if (isNaN(categoryId)) {
        res.status(400).json({ message: "ID da categoria inválido" });
        return;
      }

      const transactions = await this.transactionRepository.getByCategory(categoryId);
      if (!transactions) {
        res.status(404).json({ message: "Transações não encontradas para a categoria" });
      }else {
        res.status(200).json(transactions);
      }
    } catch (error) {
      console.error("Erro ao buscar transações por categoria:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user: userId, category: categoryId,account:accountId, description, amount, date,type } = req.body;

      if (!userId || !categoryId || !accountId || !description || !amount || !date|| !type) {
        res.status(400).json({ message: "Dados inválidos ou incompletos" });
        return;
      }

      const user = await this.userRepository.getById(userId);
      if (!user) {
        res.status(404).json({ message: "Usuário inválido" });
        return;
      }

      const category = await this.categoryRepository.getById(categoryId);
      if (!category) {
        res.status(404).json({ message: "Categoria inválida" });
        return;
      }
      
      const account = await this.accountRepository.getById(accountId);
      if (!account) {
        res.status(404).json({ message: "Conta inválida" });
        return;
      }
      const transaction = new Transaction();
      transaction.description = description;
      transaction.amount = amount;
      transaction.user = user;
      transaction.category = category;
      transaction.account = account;
      transaction.date = date;
      transaction.type = type;

      const newTransaction = await this.transactionRepository.create(transaction);
      res.status(201).json(newTransaction);
    } catch (error) {
      console.error("Erro ao criar transação:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: "ID inválido" });
        return;
      }

      const updatedTransaction = await this.transactionRepository.update(id, req.body);
      if (!updatedTransaction) {
        res.status(404).json({ message: "Transação não encontrada" });
      } else {
        res.status(200).json(updatedTransaction);
      }
    } catch (error) {
      console.error("Erro ao atualizar transação:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: "ID inválido" });
        return;
      }

      const success = await this.transactionRepository.delete(id);
      if (!success) {
        res.status(404).json({ message: "Transação não encontrada" });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      console.error("Erro ao deletar transação:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };
}
