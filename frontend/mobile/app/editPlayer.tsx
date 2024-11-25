import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Dimensions } from 'react-native';
import axios from 'axios';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Appbar } from 'react-native-paper';

const EditPlayer = () => {
  const { id } = useLocalSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await axios.get(`https://673defff0118dbfe8609718a.mockapi.io/api/v1/users/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setPassword(response.data.password);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlayer();
  }, [id]);

  const handleSave = async () => {
    try {
      await axios.put(`https://673defff0118dbfe8609718a.mockapi.io/api/v1/users/${id}`, { name, email });
      Alert.alert('Success', 'Player updated successfully');
      router.push({ pathname: '/jogadores'})
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://673defff0118dbfe8609718a.mockapi.io/api/v1/users/${id}`);
      Alert.alert('Success', 'Player deleted successfully');
      router.push({ pathname: '/jogadores'})
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.push({ pathname: '/jogadores'})} />
        <Appbar.Content title="Editar Jogador" />
      </Appbar.Header>
      <View style={styles.formContainer}>
        <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} />
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <Button title="Salvar" onPress={handleSave} />
          </View>
          <View style={styles.buttonWrapper}>
            <Button title="Excluir" onPress={handleDelete} color="red" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  formContainer: { padding: 20 },
  input: { marginBottom: 10, borderWidth: 1, padding: 10 },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonWrapper: {
    width: '40%',
  },
});

export default EditPlayer;