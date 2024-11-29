import { AppDataSource } from "./src/data-source";
import { User } from "./src/entities/Users";
import { Account } from "./src/entities/Account";
import { Category } from "./src/entities/Category";
import { Transaction } from "./src/entities/Transaction";

const seed = async () => {
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);
  const accountRepository = AppDataSource.getRepository(Account);
  const categoryRepository = AppDataSource.getRepository(Category);
  const transactionRepository = AppDataSource.getRepository(Transaction);

  const user1 = userRepository.create({
    name: "Carlos Pereira",
    email: "carlos@email.com",
    password: "hashed_password3",
  });

  const user2 = userRepository.create({
    name: "Ana Oliveira",
    email: "ana@email.com",
    password: "hashed_password4",
  });

  const user3 = userRepository.create({
    name: "Beatriz Lima",
    email: "beatriz@email.com",
    password: "hashed_password5",
  });

  await userRepository.save([user1, user2, user3]);

  const account1 = accountRepository.create({
    name: "Conta Principal",
    balance: 7000,
    user: user1,
  });

  const account2 = accountRepository.create({
    name: "Carteira de Investimentos",
    balance: 25000,
    user: user2,
  });

  const account3 = accountRepository.create({
    name: "Poupança Família",
    balance: 18000,
    user: user3,
  });

  const account4 = accountRepository.create({
    name: "Cartão de Crédito",
    balance: -2000,
    user: user3,
  });

  await accountRepository.save([account1, account2, account3, account4]);

  const categories = [
    { name: "Freelance", type: "income" as "income", user: user1 },
    { name: "Educação", type: "expense" as "expense", user: user1 },
    { name: "Saúde", type: "expense" as "expense", user: user2 },
    { name: "Viagens", type: "expense" as "expense", user: user2 },
    { name: "Presentes", type: "expense" as "expense", user: user3 },
    { name: "Bônus", type: "income" as "income", user: user3 },
  ];

  const categoryEntities = categories.map((category) => categoryRepository.create(category));
  await categoryRepository.save(categoryEntities);

  const transaction1 = transactionRepository.create({
    type: "income",
    amount: 4500,
    description: "Projeto Freelance",
    date: "2024-04-01",
    account: account1,
    category: categoryEntities.find((c) => c.name === "Freelance"),
    user: user1,
  });

  const transaction2 = transactionRepository.create({
    type: "expense",
    amount: 1200,
    description: "Curso de Programação",
    date: "2024-04-10",
    account: account1,
    category: categoryEntities.find((c) => c.name === "Educação"),
    user: user1,
  });

  const transaction3 = transactionRepository.create({
    type: "expense",
    amount: 800,
    description: "Consulta Médica",
    date: "2024-04-05",
    account: account2,
    category: categoryEntities.find((c) => c.name === "Saúde"),
    user: user2,
  });

  const transaction4 = transactionRepository.create({
    type: "expense",
    amount: 5000,
    description: "Viagem para a praia",
    date: "2024-04-15",
    account: account2,
    category: categoryEntities.find((c) => c.name === "Viagens"),
    user: user2,
  });

  const transaction5 = transactionRepository.create({
    type: "income",
    amount: 3000,
    description: "Bônus Anual",
    date: "2024-04-20",
    account: account3,
    category: categoryEntities.find((c) => c.name === "Bônus"),
    user: user3,
  });

  const transaction6 = transactionRepository.create({
    type: "expense",
    amount: 1000,
    description: "Presente de Casamento",
    date: "2024-04-25",
    account: account4,
    category: categoryEntities.find((c) => c.name === "Presentes"),
    user: user3,
  });

  await transactionRepository.save([transaction1, transaction2, transaction3, transaction4, transaction5, transaction6]);

  console.log("Novo seed de dados concluído!");
  process.exit(0);
};

seed().catch((error) => {
  console.error("Erro ao carregar os dados:", error);
  process.exit(1);
});
