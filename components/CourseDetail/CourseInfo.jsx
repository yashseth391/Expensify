import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Entypo from "@expo/vector-icons/Entypo";
import Colors from "../../utils/Colors";
const CourseInfo = ({ categoryData }) => {
  const [totalCost, setTotalCost] = useState(0);
  const [percentCost, setPercentCost] = useState(0);
  const calculateTotalPercent = () => {
    let total = 0;
    let arr = categoryData?.CategoryItems;
    for (let i = 0; i < arr?.length; i++) {
      total += arr[i]?.cost;
    }
    console.log("total cost is ", total);
    setTotalCost(total);
    setPercentCost((total / categoryData?.assigned_budget) * 80);
  };

  useEffect(() => {
    calculateTotalPercent();
  }, [categoryData]);
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={styles.iconContainer}>
          <View>
            <Text
              style={[
                styles.textIcon,
                { backgroundColor: categoryData?.color },
              ]}
            >
              {categoryData?.icon}
            </Text>
          </View>

          <View>
            <Text style={{ fontSize: hp("3.5%"), fontWeight: "bold" }}>
              {categoryData?.name}
            </Text>
            <Text style={styles.itemCount}>
              {categoryData?.CategoryItems?.length || 0} Items{" "}
            </Text>
          </View>
        </View>
        <Entypo name="trash" size={hp("3%")} color="red" />
      </View>
      <View style={styles.amountContainer}>
        <Text style={{ fontWeight: "bold" }}>₹{totalCost}</Text>
        <Text style={{ fontWeight: "bold" }}>
          Total Budget ₹{categoryData?.assigned_budget}{" "}
        </Text>
      </View>
      <View style={styles.progressBarMainContainer}>
        <View
          style={[
            styles.progressBarSubContainer,
            { width: wp((percentCost || 0) + "%") },
          ]}
        ></View>
      </View>
    </View>
  );
};

export default CourseInfo;

const styles = StyleSheet.create({
  amountContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: hp("2%"),
    flexDirection: "row",
  },

  iconContainer: {
    justifyContent: "center",
    alignItems: "baseline",
    padding: hp("3%"),
    borderRadius: hp("4%"),
    flexDirection: "row",
    alignItems: "center",
    gap: wp("3%"),
  },

  itemCount: {
    fontSize: hp("2%"),
  },
  progressBarMainContainer: {
    marginTop: hp("2%"),
    backgroundColor: Colors.GRAY,
    height: hp("1.5%"),
    width: wp("90%"),
    borderRadius: hp("1%"),
  },
  progressBarSubContainer: {
    backgroundColor: Colors.PRIMARY,
    height: hp("1.5%"),
    borderRadius: hp("1%"),
  },
  textIcon: {
    fontSize: hp("5%"),
  },
});
