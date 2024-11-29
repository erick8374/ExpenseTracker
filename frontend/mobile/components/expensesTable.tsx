import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Card,
  Text,
  Button,
  IconButton,
  Avatar,
  ActivityIndicator,
} from 'react-native-paper';
import TransactionService from './services/transactionService';
import CategoryService from './services/categoryService';

const NewExpensesTable = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const data = await TransactionService.getTransactionsbyType('expense');
      setExpenses(data || []);
    } catch (error) {
      console.error('Erro ao buscar despesas:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await CategoryService.getCategoriesbyType('expense');
      setCategories(data || []);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  const handleOpenModal = (expense) => {
    if (expense) {
      setSelectedExpense(expense);
      setDescription(expense.description);
      setAmount(expense.amount.toString());
      setDate(expense.date);
      setCategory(expense.category.id);
    } else {
      setSelectedExpense(null);
      setDescription('');
      setAmount('');
      setDate('');
      setCategory('');
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedExpense(null);
  };

  const handleSaveExpense = async () => {
    try {
      const expenseToSave = {
        ...selectedExpense,
        description,
        amount: parseFloat(amount),
        date,
        category: { id: category },
        type: 'expense',
      };

      if (selectedExpense) {
        await TransactionService.updateTransaction(selectedExpense.id, expenseToSave);
      } else {
        await TransactionService.addTransaction(expenseToSave);
      }
      fetchExpenses();
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao salvar despesa:', error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await TransactionService.deleteTransaction(id);
      fetchExpenses();
    } catch (error) {
      console.error('Erro ao remover despesa:', error);
    }
  };

  if (loading) {
    return <ActivityIndicator style={styles.loading} size="large" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.title}>
          Lista de Despesas
        </Text>
        <Button
          icon="plus"
          mode="contained"
          onPress={() => handleOpenModal(undefined)}
        >
          Adicionar
        </Button>
      </View>

      {expenses.map((expense) => (
        <Card key={expense.id} style={styles.card}>
          <Card.Title
            title={expense.description}
            subtitle={`Valor: R$ ${expense.amount.toFixed(2)}`}
            left={(props) => <Avatar.Icon {...props} icon="currency-usd" />}
          />
          <Card.Content>
            <Text variant="bodyMedium">Data: {expense.date}</Text>
            <Text variant="bodyMedium">Categoria: {expense.category.name}</Text>
          </Card.Content>
          <Card.Actions>
            <IconButton
              icon="pencil"
              onPress={() => handleOpenModal(expense)}
              size={20}
            />
            <IconButton
              icon="delete"
              onPress={() => handleDeleteExpense(expense.id)}
              size={20}
            />
          </Card.Actions>
        </Card>
      ))}

      <Modal visible={showModal} animationType="slide" onRequestClose={handleCloseModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {selectedExpense ? 'Editar Despesa' : 'Adicionar Despesa'}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Valor"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <TextInput
            style={styles.input}
            placeholder="Data"
            value={date}
            onChangeText={setDate}
          />
          <TextInput
            style={styles.input}
            placeholder="Categoria"
            value={category}
            onChangeText={setCategory}
          />
          <View style={styles.modalActions}>
            <Button mode="outlined" onPress={handleCloseModal}>
              Cancelar
            </Button>
            <Button mode="contained" onPress={handleSaveExpense}>
              Salvar
            </Button>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 16,
    elevation: 3,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewExpensesTable;
