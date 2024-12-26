import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Colors from "../utils/Colors";
import ColorPicker from "../components/ColorPicker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { supabase } from "../utils/SupabaseConfig";
import { client } from "../utils/KindeConfig";
import { useRouter } from "expo-router";
const AddNewCategory = () => {
  const [selectedIcon, setSelectedIcon] = useState("🏋️‍♂️");
  const [selectedColor, setSelectedColor] = useState(Colors.PRIMARY);
  const [categoryName, setCategoryName] = useState("");
  const [totalBudget, setTotalBudget] = useState("");
  const router = useRouter();
  const onCreateCategory = async () => {
    const user = await client.getUserDetails();
    const { data, error } = await supabase
      .from("Category")
      .insert([
        {
          name: categoryName,
          icon: selectedIcon,
          color: selectedColor,
          assigned_budget: totalBudget,
          created_by: user.id,
        },
      ])
      .select();

    console.log("data is ", data);
    if (data) {
      router.replace({
        pathname: "/CategoryDetail",
        params: {
          categoryId: data[0].id,
        },
      });
      ToastAndroid.show("Category Created Successfully", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <TextInput
          style={[styles.iconInput, { backgroundColor: selectedColor }]}
          maxLength={2}
          onChangeText={(value) => setSelectedIcon(value.toUpperCase())}
        >
          {selectedIcon}
        </TextInput>
        <ColorPicker
          selectedColor={selectedColor}
          setSelectedColor={(color) => setSelectedColor(color)}
        />
      </View>
      {/* Add categoryName and total Budget Section */}
      <View style={styles.inputView}>
        <MaterialIcons name="local-offer" size={hp("4%")} color={Colors.GRAY} />
        <TextInput
          placeholder="Category Name"
          style={{ width: wp("100%"), fontSize: hp("3%") }}
          onChangeText={(value) => setCategoryName(value)}
        />
      </View>
      <View style={styles.inputView}>
        <FontAwesome name="rupee" size={hp("4%")} color={Colors.GRAY} />
        <TextInput
          placeholder="Toal Budget"
          style={{ width: wp("100%"), fontSize: hp("3%") }}
          keyboardType="numeric"
          onChangeText={(value) => setTotalBudget(value)}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          disabled={categoryName === "" || totalBudget === ""}
          onPress={() => onCreateCategory()}
        >
          <Text style={{ fontSize: hp("3%"), color: Colors.WHITE }}>
            Create
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddNewCategory;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: hp("2%"),
    borderRadius: hp("2%"),
    alignItems: "center",
    marginTop: hp("3%"),
  },

  container: {
    marginTop: hp("1%"),
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
  inputView: {
    borderWidth: hp("0.15%"),
    display: "flex",
    flexDirection: "row",
    gap: wp("4%"),
    padding: hp("1%"),
    borderRadius: hp("2%"),
    borderColor: Colors.GRAY,
    backgroundColor: Colors.WHITE,
    alignItems: "center",
    marginTop: hp("3%"),
  },
});
