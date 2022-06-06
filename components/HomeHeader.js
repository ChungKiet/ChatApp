import { useRoute } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Text } from "react-native";
import GlobalContext from "../context/Context";
import Avatar from "./Avatar";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeHeader() {
  const route = useRoute();
  const navigation = useNavigation();
  const {
    theme: { colors },
  } = useContext(GlobalContext);
  return (
    <View
      style={{
        flex: 1,
        padding: 0,
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <Text style={{ color: colors.white, fontSize: 20, fontWeight: "bold" }}>
        KNK ChatApp
      </Text>
      <TouchableOpacity
        style={{
          position: "absolute",
          right: -200,
          height: 40,
          width: 40,
          borderRadius: 40,
          backgroundColor: colors.foreground,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => navigation.navigate("settings")}
      >
        <Ionicons
          name="settings-outline"
          size={30}
          color={colors.white}
        ></Ionicons>
      </TouchableOpacity>
    </View>
  );
}
