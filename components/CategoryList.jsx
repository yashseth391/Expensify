import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Colors from "../utils/Colors";
import { useRouter } from "expo-router";
const CategoryList = ({ categoryList }) => {
  const router = useRouter();
  const onCategoryClick = (catergory) => {
    router.push({
      pathname: "./CategoryDetail",
      params: {
        categoryId: catergory.id,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: hp("3%"),
          marginBottom: hp("2%"),
        }}
      >
        Latest Budget
      </Text>

      {categoryList &&
        categoryList.map((category, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.itemContainer}
              onPress={() => onCategoryClick(category)}
            >
              <View style={styles.iconContainer}>
                <Text
                  style={[styles.iconText, { backgroundColor: category.color }]}
                >
                  {category.icon}
                </Text>
              </View>
              <View>
                <View style={styles.subContainer}>
                  <View>
                    <Text style={styles.categoryText}> {category.name} </Text>
                    <Text style={styles.itemCount}>
                      {category?.CategoryItems?.length || 0} Items
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.totalAmountText}>
                      ₹{category.assigned_budget}{" "}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  categoryText: {
    fontWeight: "bold",
    fontSize: hp("2%"),
  },
  container: {
    marginTop: hp("3.5%"),
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "baseline",
  },
  iconText: {
    fontSize: hp("4%"),
    padding: hp("1.5%"),
    borderRadius: hp("4%"),
  },
  itemContainer: {
    marginBottom: hp("1%"),
    display: "flex",
    flexDirection: "row",
    gap: wp("2.5%"),
    backgroundColor: Colors.WHITE,
    padding: hp("0.6%"),
    borderRadius: hp("3%"),
  },
  itemCount: {},
  subContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp("70%"),
  },
  totalAmountText: {
    fontSize: hp("2%"),
    color: "grey",
  },
});
