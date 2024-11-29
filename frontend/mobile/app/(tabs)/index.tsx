import Summary from '@/components/infoSummary';
import MatchCard from '@/components/MatchCard';
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function Home() {

  return (
    <View style={styles.container}>
      <Summary/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  list: {
    paddingHorizontal: 16,
  },
});
