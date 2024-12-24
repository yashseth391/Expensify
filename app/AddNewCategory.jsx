import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Colors from "../utils/Colors";
import ColorPicker from "../components/ColorPicker";
const AddNewCategory = () => {
  const [selectedIcon, setSelectedIcon] = useState("IC");
  const [selectedColor, setSelectedColor] = useState(Colors.PRIMARY);
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <TextInput
          style={[styles.iconInput, { backgroundColor: selectedColor }]}
          maxLength={2}
        >
          {selectedIcon}
        </TextInput>
      </View>
      <ColorPicker
        selectedColor={selectedColor}
        setSelectedColor={(color) => setSelectedColor(color)}
      />
    </View>
  );
};

export default AddNewCategory;

const styles = StyleSheet.create({
  container: {
    marginTop: hp("5%"),
    padding: hp("3%"),
  },
  iconInput: {
    textAlign: "center",
    fontSize: hp("4%"),
    padding: hp("2%"),
    borderRadius: hp("7%"),
    paddingHorizontal: wp("7%"),
    color: Colors.WHITE,
  },
});
