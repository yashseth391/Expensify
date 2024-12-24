import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
const AddNewCategory = () => {
  return (
    <View style={styles.container}>
      <Text>AddNewCategory</Text>
    </View>
  );
};

export default AddNewCategory;

const styles = StyleSheet.create({
  container: {
    marginTop: hp("5%"),
  },
});
