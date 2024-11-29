import AccountMenu from '@/components/accountMenu';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Income() {
  return (
    <View style={styles.container}>
      <AccountMenu/>
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
