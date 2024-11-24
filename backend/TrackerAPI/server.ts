import app from "./src/app";
import { AppDataSource } from "./src/data-source";

const PORT = parseInt(process.env.API_PORT || '3001');

AppDataSource.initialize()
  .then(() => {
    console.log("Fonte de dados inicilizada!");
    app.listen(PORT, () => {
      console.log(`Server rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro durante a incialização da fonte de dados:", error);
  });
