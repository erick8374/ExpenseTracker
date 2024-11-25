import JogadorCard from "@/components/JogadorCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Expenses({ navigation }) {
  const [players, setExpenses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(
          "https://localhost:3001/webmob/api/transactions?type=expense"
        );
        setExpenses(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <JogadorCard
                id={item.id}
                name={item.name}
                email={item.email}
            />
        )}
      />
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
