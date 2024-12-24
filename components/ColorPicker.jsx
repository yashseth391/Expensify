import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "../utils/Colors";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
const ColorPicker = ({ selectedColor, setSelectedColor }) => {
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        {Colors.COLOR_LIST.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.colorContainer,
              { backgroundColor: color },
              selectedColor === color
                ? { borderWidth: 4, borderColor: Colors.BLACK }
                : {},
            ]}
            onPress={() => setSelectedColor(color)}
          />
        ))}
      </View>
    </View>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  colorContainer: {
    marginTop: hp("3%"),
    width: hp("4%"),
    height: hp("4%"),
    borderRadius: hp("2%"),
    margin: hp("1%"),
  },
});
