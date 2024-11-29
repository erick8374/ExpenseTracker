import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useRouter } from "expo-router";
import NewExpensesTable from "@/components/expensesTable";

export default function Expenses({ navigation }) {
  const router = useRouter();

  useEffect(() => {
  }, []);

  return (
    <View style={styles.container}>
      <NewExpensesTable/>
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
