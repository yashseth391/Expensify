import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Link, useLocalSearchParams, useRouter } from "expo-router";

import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { supabase } from "../utils/SupabaseConfig";
import CourseInfo from "../components/CourseDetail/CourseInfo";
import CourseItemList from "../components/CourseDetail/CourseItemList";
import AntDesign from "@expo/vector-icons/AntDesign";
import Colors from "../utils/Colors";
const CategoryDetail = () => {
  const { categoryId } = useLocalSearchParams();
  const [categoryData1, setCategoryData1] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (categoryId) {
      getCategoryDetail();
    }
  }, [categoryId]);

  const getCategoryDetail = async () => {
    const { data, error } = await supabase
      .from("Category")
      .select("*,CategoryItems(*)")
      .eq("id", categoryId);

    setCategoryData1(data[0]);
    console.log("CAT:", data[0]);
  };

  return (
    <View style={{ marginTop: hp("4%"), padding: hp("2%"), flex: 1 }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle" size={hp("5%")} color="black" />
      </TouchableOpacity>
      <CourseInfo categoryData={categoryData1} />
      <CourseItemList categoryData={categoryData1} />
      <Link
        style={styles.floatingButton}
        href={{
          pathname: "/AddNewCategoryItem",
          params: {
            categoryId: categoryId,
          },
        }}
      >
        <AntDesign name="pluscircle" size={hp("6%")} color={Colors.PRIMARY} />
      </Link>
    </View>
  );
};

export default CategoryDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButton: {
    position: "absolute",
    bottom: hp("5%"),
    right: hp("5%"),
  },
});
