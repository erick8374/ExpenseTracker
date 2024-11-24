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
    name: "João Silva",
    email: "joao@email.com",
    password: "hashed_password1",
  });

  const user2 = userRepository.create({
    name: "Maria Santos",
    email: "maria@email.com",
    password: "hashed_password2",
  });

  await userRepository.save([user1, user2]);

  const account1 = accountRepository.create({
    name: "Conta Corrente",
    balance: 5000,
    user: user1,
  });

  const account2 = accountRepository.create({
    name: "Carteira Digital",
    balance: 1500,
    user: user1,
  });

  const account3 = accountRepository.create({
    name: "Conta Poupança",
    balance: 10000,
    user: user2,
  });

  await accountRepository.save([account1, account2, account3]);

  const categories = [
    { name: "Salário", type: "income" as "income", user: user1 },
    { name: "Alimentação", type: "expense" as "expense", user: user1 },
    { name: "Transporte", type: "expense" as "expense", user: user1 },
    { name: "Investimentos", type: "income" as "income", user: user2 },
    { name: "Lazer", type: "expense" as "expense", user: user2 },
  ];

  const categoryEntities = categories.map((category) => categoryRepository.create(category));
  await categoryRepository.save(categoryEntities);

  const transaction1 = transactionRepository.create({
    type: "income",
    amount: 3000,
    description: "Salário de Março",
    date: "2024-03-01",
    account: account1,
    category: categoryEntities.find((c) => c.name === "Salário"),
    user: user1,
  });

  const transaction2 = transactionRepository.create({
    type: "expense",
    amount: 150,
    description: "Almoço no restaurante",
    date: "2024-03-05",
    account: account1,
    category: categoryEntities.find((c) => c.name === "Alimentação"),
    user: user1,
  });

  const transaction3 = transactionRepository.create({
    type: "income",
    amount: 2000,
    description: "Investimento em ações",
    date: "2024-03-10",
    account: account3,
    category: categoryEntities.find((c) => c.name === "Investimentos"),
    user: user2,
  });

  const transaction4 = transactionRepository.create({
    type: "expense",
    amount: 300,
    description: "Cinema com amigos",
    date: "2024-03-15",
    account: account3,
    category: categoryEntities.find((c) => c.name === "Lazer"),
    user: user2,
  });

  await transactionRepository.save([transaction1, transaction2, transaction3, transaction4]);

  console.log("Carga de dados concluída!");
  process.exit(0);
};

seed().catch((error) => {
  console.error("Erro ao carregar os dados:", error);
  process.exit(1);
});
