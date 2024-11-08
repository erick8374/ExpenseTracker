import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import AccountRepository from "../repositories/accountRepository";

export class AccountController {
  private accountRepository: AccountRepository;

  constructor() {
      this.accountRepository = new AccountRepository(AppDataSource);
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
      const accounts = await this.accountRepository.getAll();
      res.status(200).json(accounts);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
      const account = await this.accountRepository.getById(parseInt(req.params.id));
      if (!account) {
          res.status(404).send('Account not found');
      } else {
          res.status(200).json(account);
      }
  };

  getByUser = async (req: Request, res: Response): Promise<void> => {
      const account = await this.accountRepository.getByUser(parseInt(req.params.userId));
      if (!account) {
          res.status(404).send('Accounts not found');
      } else {
          res.status(200).json(account);
      }
  }


  create = async (req: Request, res: Response): Promise<void> => {
      const newAccount = await this.accountRepository.create(req.body);
      res.status(201).json({message: "Account added"});
  };

  update = async (req: Request, res: Response): Promise<void> => {
      const updatedAccount = await this.accountRepository.update(parseInt(req.params.id), req.body);
      if (!updatedAccount) {
          res.status(404).send('Account not found');
      } else {
          res.status(200).json(updatedAccount);
      }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
      const success = await this.accountRepository.delete(parseInt(req.params.id));
      if (!success) {
          res.status(404).send('Account not found');
      } else {
          res.status(204).send();
      }
  };
}