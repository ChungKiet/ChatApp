import React from "react";
import { useContext } from "react";
import GlobalContext from "../context/Context";
import { View, Text, Button } from "react-native";
import ListItem from "../components/ListItem";
import { TouchableOpacity } from "react-native";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigation } from "@react-navigation/native";

export default function Settings() {
  const navigation = useNavigation();
  const {
    theme: { colors },
  } = useContext(GlobalContext);
  async function handleSignOut() {
    await Promise.all([signOut(auth)]);
    navigation.navigate("signIn");
  }
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TouchableOpacity onPress={() => signOut(auth)}>
        <View style={{ margin: "auto", width: "100%" }}>
          <Button
            title="Edit Profile"
            color={colors.foreground}
            onPress={() => navigation.navigate("editprofile")}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => signOut(auth)}>
        <View style={{ margin: "auto", marginTop: 10, width: "100%" }}>
          <Button
            title="Sign Out"
            color={colors.foreground}
            onPress={handleSignOut}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}
