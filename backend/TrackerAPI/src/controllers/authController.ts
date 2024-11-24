import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = "nota10";

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email === "aluno@teste.com" && password === "teste") {
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

    return res.status(200).json({ message: "Login bem-sucedido", token });
  }

  return res.status(401).json({ message: "Credenciais inválidas" });
};
