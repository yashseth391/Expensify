import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import services from "../../utils/services";
import { useRouter } from "expo-router";
import { client } from "../../utils/KindeConfig";

const index = () => {
  const router = useRouter();
  const handleLogout = async () => {
    const loggedOut = await client.logout();

    if (!loggedOut) {
      await services.storeData("login", "false");
      router.replace("/login/Home");
    }
  };

  const checkUserAuth = async () => {
    const result = await services.getData("login");
    console.log(result);
    if (result !== "true") {
      router.replace("/login/Home");
    }
  };

  useEffect(() => {
    checkUserAuth();
  }, []);

  return (
    <View style={{ marginTop: 20 }}>
      <Text>index</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
