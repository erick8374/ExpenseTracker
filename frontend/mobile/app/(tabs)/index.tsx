import MatchCard from '@/components/MatchCard';
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function Home() {
  // Array de partidas
  const matches = [
    { id: '1', championshipName: 'Campeonato Mundial', player1: 'Jogador 1', player2: 'Jogador 2', startDate: '10/11/2024' },
    { id: '2', championshipName: 'Copa Nacional', player1: 'Jogador 3', player2: 'Jogador 4', startDate: '12/11/2024' },
    { id: '3', championshipName: 'Liga Regional', player1: 'Jogador 5', player2: 'Jogador 6', startDate: '14/11/2024' },
    // Adicione mais partidas conforme necessário
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Partidas em Andamento</Text>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MatchCard
            tournament={item.championshipName}
            player1={item.player1}
            player2={item.player2}
            startDate={item.startDate}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  list: {
    paddingHorizontal: 16,
  },
});
