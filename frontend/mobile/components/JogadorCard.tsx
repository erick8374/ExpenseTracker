import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Botao from './Botao';

type JogadorCardProps = {
  id: string;
  name: string;
  email: string;
};

export default function JogadorCard({ id, name, email }: JogadorCardProps) {
  const router = useRouter();

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{email}</Text>
        </View>
        <Botao icon={'account-edit'} onPress={() => router.push({ pathname: '/editPlayer', params: { id } })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});