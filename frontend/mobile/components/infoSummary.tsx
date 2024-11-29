import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { Card, ActivityIndicator } from "react-native-paper";
import { LineChart, PieChart } from "react-native-chart-kit";
import TransactionService from "./services/transactionService";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const Summary: React.FC = () => {
  const [expenses, setExpenses] = useState<number>(0);
  const [incomes, setIncomes] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const fetchTransactionsSummary = async () => {
    setLoading(true);
    try {
      const expenseData = await TransactionService.getTransactionsbyType("expense");
      const incomeData = await TransactionService.getTransactionsbyType("income");

      const totalExpenses = expenseData.reduce((sum: number, tx: any) => sum + parseFloat(tx.amount), 0);
      const totalIncomes = incomeData.reduce((sum: number, tx: any) => sum + parseFloat(tx.amount), 0);

      setExpenses(totalExpenses);
      setIncomes(totalIncomes);
    } catch (error) {
      console.error("Erro ao buscar resumo de transações:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactionsSummary();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loading} size="large" />;
  }

  const dataForPieChart = [
    { name: "Gastos", amount: expenses, color: "#FF6347", legendFontColor: "#333", legendFontSize: 14 },
    { name: "Renda", amount: incomes, color: "#32CD32", legendFontColor: "#333", legendFontSize: 14 },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Resumo Financeiro" />
        <Card.Content>
          <Text style={styles.summaryText}>Renda: R$ {incomes.toFixed(2)}</Text>
          <Text style={styles.summaryText}>Gastos: R$ {expenses.toFixed(2)}</Text>
          <Text style={styles.summaryText}>
            Saldo: R$ {(incomes - expenses).toFixed(2)}
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Gráfico de Proporção (Gastos vs. Renda)" />
        <Card.Content>
          <PieChart
            data={dataForPieChart}
            width={screenWidth - 32}
            height={200}
            chartConfig={{
              backgroundColor: "#f5f5f5",
              backgroundGradientFrom: "#f5f5f5",
              backgroundGradientTo: "#ffffff",
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            center={[10, 0]}
            absolute
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Histórico de Transações" />
        <Card.Content>
          <LineChart
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              datasets: [
                { data: [200, 450, 300, 600, 750, 500], color: () => "#32CD32" }, // Renda
                { data: [150, 400, 200, 550, 700, 450], color: () => "#FF6347" }, // Gastos
              ],
            }}
            width={screenWidth - 32}
            height={220}
            yAxisLabel="R$"
            chartConfig={{
              backgroundColor: "#f5f5f5",
              backgroundGradientFrom: "#f5f5f5",
              backgroundGradientTo: "#ffffff",
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: () => "#333",
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default Summary;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    marginBottom: 16,
    elevation: 3,
  },
  summaryText: {
    fontSize: 16,
    marginVertical: 4,
    color: "#333",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
