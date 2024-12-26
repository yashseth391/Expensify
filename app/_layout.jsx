import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
const HomeLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="AddNewCategory"
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Add New Category",
        }}
      />
      <Stack.Screen
        name="AddNewCategoryItem"
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Add New  Item",
        }}
      />
    </Stack>
  );
};

export default HomeLayout;

const styles = StyleSheet.create({
  container: {
    marginTop: hp("5%"),
  },
});
