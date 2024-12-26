import {
  Button,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import CategoryList from "../../components/CategoryList";
const index = () => {
  const router = useRouter();
  const [categoryList, setCategoryList] = useState();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const user = await client.getUserDetails();
    let { data, error } = await supabase
      .from("Category")
      .select("*,CategoryItems(*)")
      .eq("created_by", user.id);
    setCategoryList(data);
    console.log("user data", data);
    data && setLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => getCategoryList()}
          />
        }
      >
        <View style={styles.container}>
          <Headers />
        </View>
        <View
          style={{
            marginTop: -hp("8%"),
            marginRight: wp("5%"),
            marginLeft: wp("5%"),
          }}
        >
          <CircularChart />
          <CategoryList categoryList={categoryList} />
        </View>
      </ScrollView>
      <View style={styles.plusButton}>
        <TouchableOpacity onPress={() => router.push("/AddNewCategory")}>
          <AntDesign name="pluscircle" size={hp("6%")} color={Colors.PRIMARY} />
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
    top: hp("89.9%"),
    right: wp("5%"),
  },
});
