import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import {
  Card,
  Text,
  Button,
  IconButton,
  Avatar,
  ActivityIndicator,
} from "react-native-paper";
import AccountService from "./services/accountService";
import AccountInterface from "./interfaces/AccountInterface";

const AccountMenu: React.FC = () => {
  const [accounts, setAccounts] = useState<AccountInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<AccountInterface | null>(null);
  const [accountName, setAccountName] = useState("");
  const [accountBalance, setAccountBalance] = useState("");

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const data = await AccountService.getAccounts();
      setAccounts(data || []);
    } catch (error) {
      console.error("Erro ao buscar contas bancárias:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleOpenModal = (account?: AccountInterface) => {
    if (account) {
      setSelectedAccount(account);
      setAccountName(account.name);
      setAccountBalance(account.balance.toString());
    } else {
      setSelectedAccount(null);
      setAccountName("");
      setAccountBalance("");
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAccount(null);
  };

  const handleSaveAccount = async () => {
    if (!accountName || !accountBalance) {
      Alert.alert("Erro", "Preencha todos os campos antes de salvar.");
      return;
    }

    try {
      const accountToSave: AccountInterface = {
        ...selectedAccount,
        name: accountName,
        balance: parseFloat(accountBalance),
      };

      if (selectedAccount) {
        await AccountService.updateAccount(selectedAccount.id, accountToSave);
      } else {
        await AccountService.addAccount(accountToSave);
      }

      fetchAccounts();
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao salvar conta bancária:", error);
    }
  };

  const handleDeleteAccount = async (id: number) => {
    try {
      await AccountService.deleteAccount(id);
      fetchAccounts();
    } catch (error) {
      console.error("Erro ao remover conta bancária:", error);
    }
  };

  if (loading) {
    return <ActivityIndicator style={styles.loading} size="large" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {accounts.map((account) => (
          <Card key={account.id} style={styles.card}>
            <Card.Title
              title={account.name}
              subtitle={`Saldo: R$ ${account.balance.toFixed(2)}`}
              left={(props) => <Avatar.Icon {...props} icon="bank" />}
            />
            <Card.Content>
              <Text variant="bodyMedium">Código da conta: {account.id}</Text>
            </Card.Content>
            <Card.Actions>
              <IconButton
                icon="pencil"
                onPress={() => handleOpenModal(account)}
                size={20}
              />
              <IconButton
                icon="delete"
                onPress={() => handleDeleteAccount(account.id)}
                size={20}
              />
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>

      <Button
        mode="contained"
        style={styles.addButton}
        onPress={() => handleOpenModal()}
      >
        Adicionar Conta
      </Button>

      <Modal visible={showModal} animationType="slide" onRequestClose={handleCloseModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {selectedAccount ? "Editar Conta" : "Adicionar Conta"}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Nome da Conta"
            value={accountName}
            onChangeText={setAccountName}
          />
          <TextInput
            style={styles.input}
            placeholder="Saldo"
            keyboardType="numeric"
            value={accountBalance}
            onChangeText={setAccountBalance}
          />

          <View style={styles.modalActions}>
            <Button mode="text" onPress={handleCloseModal}>
              Cancelar
            </Button>
            <Button mode="contained" onPress={handleSaveAccount}>
              Salvar
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AccountMenu;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    marginBottom: 16,
    elevation: 3,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    margin: 16,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
