import Contador from '@/components/Contador';
import NewIncomesTable from '@/components/incomesTable';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Income() {
  return (
    <View style={styles.container}>
      <NewIncomesTable/>
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
