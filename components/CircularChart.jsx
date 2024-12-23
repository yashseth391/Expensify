import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import PieChart from "react-native-pie-chart";
import Colors from "../utils/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
const CircularChart = () => {
  const widthAndHeight = hp("20%");

  const [values, setValues] = useState([1]);

  const [sliceColor, setSliceColor] = useState([Colors.GRAY]);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Total Estimate : <Text style={{ fontWeight: "bold" }}>₹0</Text>
      </Text>
      <View style={styles.subContainer}>
        <View>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={values}
            sliceColor={sliceColor}
            coverRadius={0.65}
            coverFill={"#FFF"}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: wp("2%"),
            alignItems: "center",
          }}
        >
          <AntDesign name="alipay-circle" size={24} color="grey" />
          <Text>NA</Text>
        </View>
      </View>
    </View>
  );
};

export default CircularChart;

const styles = StyleSheet.create({
  container: {
    //height : hp("30%"),
    marginTop: hp("5%"),
    backgroundColor: Colors.WHITE,
    padding: hp("2%"),
    borderRadius: hp("2%"),
    elevation: 5,
  },
  subContainer: {
    marginTop: hp("2%"),
    flexDirection: "row",
    gap: wp("10%"),
  },
  text: {
    fontSize: hp("2.5%"),
    color: Colors.BLACK,
  },
});
