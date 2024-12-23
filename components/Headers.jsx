import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { client } from "../utils/KindeConfig";
import Colors from "../utils/Colors";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
const Headers = () => {
  const [user, setUser] = useState(null);

  const getUserDetails = async () => {
    const user = await client.getUserDetails();
    setUser(user);
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 8,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Image source={{ uri: user?.picture }} style={styles.image} />
      {/* jaisa gmail mai name ke hisab se color aur text image mai aa jaata hai */}

      <View>
        <Text style={{ color: Colors.WHITE, fontSize: 16 }}> Welcome</Text>
        <Text style={{ color: Colors.WHITE, fontSize: 20 }}>
          {user?.given_name}
        </Text>
      </View>
      <Ionicons
        name="notifications"
        size={24}
        color="white"
        style={styles.notificationIcon}
      />
    </View>
  );
};

export default Headers;

const styles = StyleSheet.create({
  image: {
    height: hp("6%"),
    width: wp("10%"),
    borderRadius: hp("5%"),
  },
  notificationIcon: {
    marginLeft: "auto",
  },
});
