import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../utils/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Foundation from "@expo/vector-icons/Foundation";
import { supabase } from "../utils/SupabaseConfig";
import { useLocalSearchParams, useRouter } from "expo-router";
const AddNewCategoryItem = () => {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [note, setNote] = useState("");
  const { categoryId } = useLocalSearchParams();
  const router = useRouter();

  const onAddItem = async () => {
    const { data, error } = await supabase
      .from("CategoryItems")
      .insert([
        {
          name: name,
          cost: cost,
          note: note,
          category_id: categoryId,
        },
      ])
      .select();
    console.log("DATA:", data);
    ToastAndroid.show("Item Added Successfully", ToastAndroid.SHORT);
    router.replace({
      pathname: "./CategoryDetail",
      params: {
        categoryId: categoryId,
      },
    });
  };
  return (
    <View style={{ padding: hp("2%") }}>
      <View style={styles.textInputContainer}>
        <Ionicons name="pricetag" size={hp("2.5%")} color={Colors.GRAY} />
        <TextInput
          placeholder="Item Name"
          style={{
            fontSize: hp("2.5%"),
            width: hp("100%"),
          }}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.textInputContainer}>
        <FontAwesome name="rupee" size={hp("2.5%")} color={Colors.GRAY} />
        <TextInput
          placeholder="Cost"
          style={{
            fontSize: hp("2.5%"),
            width: hp("100%"),
          }}
          onChangeText={(text) => setCost(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.textInputContainer}>
        <Foundation
          name="clipboard-notes"
          size={hp("2.5%")}
          color={Colors.GRAY}
        />
        <TextInput
          placeholder="Note (Optional)"
          numberOfLines={3}
          style={{
            fontSize: hp("2.5%"),
            width: hp("100%"),
          }}
          onChangeText={(text) => setNote(text)}
        />
      </View>
      <TouchableOpacity
        style={styles.btn}
        disabled={!name || !cost}
        onPress={() => onAddItem()}
      >
        <Text style={{ color: Colors.WHITE, fontSize: hp("2.5%") }}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddNewCategoryItem;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: hp("3%"),
    alignItems: "center",
    borderRadius: hp("2%"),
    marginTop: hp("3%"),
  },
  textInputContainer: {
    padding: hp("2%"),
    flexDirection: "row",
    borderWidth: widthPercentageToDP("0.2%"),
    borderColor: "black",
    gap: hp("2%"),
    alignItems: "center",
    borderRadius: hp("2%"),
    marginTop: hp("2%"),
  },
});
