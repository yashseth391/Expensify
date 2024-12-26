import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Colors from "../../utils/Colors";
const CourseItemList = ({ categoryData }) => {
  return (
    <View style={{ marginTop: hp("4%"), padding: hp("2%") }}>
      <Text style={styles.headingText}>Item List</Text>
      <View style={{ marginTop: hp("2%"), alignItems: "center" }}>
        {categoryData?.CategoryItems.length > 0 ? (
          categoryData?.CategoryItems?.map((item, index) => {
            return (
              <View key={index}>
                <View
                  style={{
                    borderWidth: hp("0.2%"),
                    width: wp("70%"),
                    borderColor: Colors.GRAY,
                  }}
                ></View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: hp("1%"),
                    gap: wp("5%"),
                  }}
                >
                  <Text style={{ fontSize: hp("2.5%"), fontWeight: "bold" }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: hp("2.5%") }}>-</Text>
                  <Text style={{ fontSize: hp("2.5%"), fontWeight: "bold" }}>
                    ₹{item.cost}
                  </Text>
                </View>
              </View>
            );
          })
        ) : (
          <Text style={styles.noItemText}>No Items Found</Text>
        )}
      </View>
    </View>
  );
};

export default CourseItemList;

const styles = StyleSheet.create({
  headingText: {
    fontSize: hp("3%"),
    fontWeight: "bold",
  },
  noItemText: {
    fontSize: hp("4%"),
    color: Colors.GRAY,
  },
});
