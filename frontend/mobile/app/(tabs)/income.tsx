import Contador from '@/components/Contador';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Income() {
  return (
    <View style={styles.container}>
      <Contador key="up" title="Nós" />
      <Contador key="down" title="Eles" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
