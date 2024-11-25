import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type MatchCardProps = {
  tournament: string;
  player1: string;
  player2: string;
  startDate: string;
};

export default function MatchCard({ tournament, player1, player2, startDate }: MatchCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{tournament}</Text>
      <Text style={styles.subtitle}>{player1} vs {player2}</Text>
      <Text style={styles.date}>Início: {startDate}</Text>
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
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#999',
  },
});
