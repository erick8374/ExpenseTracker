import { FontAwesome6 } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import { useRouter } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";

export default function TabLayout() {
  const router = useRouter();
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Tabs screenOptions={{ tabBarActiveTintColor: "green" }}>
        <Tabs.Screen
          name="income"
          options={{
            title: "Renda",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons size={28} name="wallet" color={color} />
            ),
          }}
        />
          <Tabs.Screen
            name="expenses"
            options={{
              title: "Gastos",
              tabBarIcon: ({ color }) => (
                <FontAwesome6 name="money-bill-transfer" size={24} color={color} />            ),
                headerRight: () => (
                  <MaterialCommunityIcons
                  name="plus"
                  size={28}
                  style={{ marginRight: 15 }}
                  onPress={() => router.push('/addPlayer')}
                  />
                ),
              }}
          />
              <Tabs.Screen
                name="index"
                options={{
                  title: "Home",
                  tabBarIcon: ({ color }) => (
                    <FontAwesome size={28} name="home" color={color} />
                  ),
                  headerRight: () => (
                    <FontAwesome.Button
                    name="sign-out"
                    size={24}
                    backgroundColor="transparent"
                    color="#000"
                    onPress={() => {
                      router.replace("/login");
                    }}
                    />
                  ),
                }}
              />
        <Tabs.Screen
          name="accounts"
          options={{
            title: "Contas",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="bank" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Perfil",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="user" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}