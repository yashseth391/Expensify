import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import services from "../utils/services";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();
  const checkUserAuth = async () => {
    const result = await services.getData("login");

    if (result !== "true") {
      router.replace("/login/Home");
    }
  };

  useEffect(() => {
    checkUserAuth();
  }, []);

  return (
    <View>
      <Text>index</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
