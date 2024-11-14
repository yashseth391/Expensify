import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import services from "../../utils/services";
import { useRouter } from "expo-router";
import { client } from "../../utils/KindeConfig";
import { supabase } from "../../utils/SupabaseConfig";

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
    getCategoryList();
  }, []);
  const getCategoryList = async () => {
    const user = await client.getUserDetails();
    let { data, error } = await supabase
      .from("Category")
      .select("*")
      .eq("created_by", user.email);
    console.log(data);
  };
  return (
    <View style={{ marginTop: 20 }}>
      <Text>index</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
