import {
  Button,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import services from "../../utils/services";
import { useRouter } from "expo-router";
import { client } from "../../utils/KindeConfig";
import { supabase } from "../../utils/SupabaseConfig";
import Headers from "../../components/Headers";
import Colors from "../../utils/Colors";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import CircularChart from "../../components/CircularChart";
import AntDesign from "@expo/vector-icons/AntDesign";
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
    console.log("result is ", result);
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
    console.log("user data", data);
  };
  return (
    <View>
      <View style={styles.container}>
        <Headers />
        <CircularChart />
      </View>
      <View style={styles.plusButton}>
        <TouchableOpacity onPress={() => router.push("/AddNewCategory")}>
          <AntDesign name="pluscircle" size={hp("8%")} color={Colors.PRIMARY} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    marginTop: hp("5%"),
    padding: hp("2%"),
    backgroundColor: Colors.PRIMARY,
    height: hp("15%"),
  },
  plusButton: {
    position: "absolute",
    top: hp("85%"),
    right: wp("5%"),
  },
});
