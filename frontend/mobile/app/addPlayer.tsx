import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { Appbar } from 'react-native-paper';

const AddPlayer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleAddPlayer = async () => {
    try {
      await axios.post('https://673defff0118dbfe8609718a.mockapi.io/api/v1/users', { name, email, password });
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.push({ pathname: '/jogadores'}) } />
        <Appbar.Content title="Adicionar Jogador" />
      </Appbar.Header>
      <View style={styles.formContainer}>
        <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
        <Button title="Adicionar" onPress={handleAddPlayer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  formContainer: { padding: 20 },
  input: { marginBottom: 10, borderWidth: 1, padding: 10 },
});

export default AddPlayer;