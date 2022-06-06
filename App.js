import React, { useState, useEffect, useContext } from "react";
import { Text, View, LogBox } from "react-native";
import { useAssets } from "expo-asset";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SignIn from "./screens/SignIn";
import ContextWrapper from "./context/ContextWrapper";
import Context from "./context/Context";
import Profile from "./screens/Profile";
import Chats from "./screens/Chats";
import Photo from "./screens/Photo";
import { Ionicons } from "@expo/vector-icons";
import Contacts from "./screens/Contacts";
import Chat from "./screens/Chat";
import Settings from "./screens/Settings";
import EditProfile from "./screens/EditProfile";
import HomeHeader from "./components/HomeHeader";
import ChatHeader from "./components/ChatHeader";
LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    theme: { colors },
  } = useContext(Context);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setCurrUser(user);
      } else {
        setCurrUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!currUser ? (
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="signIn" component={SignIn} />
          </Stack.Group>
        ) : (
          <Stack.Group
            screenOptions={{
              headerStyle: {
                backgroundColor: colors.foreground,
                shadowOpacity: 0,
                elevation: 0,
              },
              headerTintColor: colors.white,
            }}
          >
            {!currUser.displayName && (
              <Stack.Screen
                name="profile"
                component={Profile}
                options={{ headerShown: false }}
              />
            )}
            <Stack.Screen
              name="home"
              options={{ headerTitle: (props) => <HomeHeader {...props} /> }}
              component={Home}
            />
            <Stack.Screen
              name="contacts"
              options={{ title: "Select Contacts" }}
              component={Contacts}
            />
            <Stack.Screen
              name="chat"
              component={Chat}
              options={{ headerTitle: (props) => <ChatHeader {...props} /> }}
            />
            <Stack.Screen
              name="settings"
              options={{ title: "Settings" }}
              component={Settings}
            />
            <Stack.Screen
              name="editprofile"
              options={{ title: "Edit Profile" }}
              component={EditProfile}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function Home() {
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarLabel: () => {
            if (route.name === "photo") {
              return <Ionicons name="camera" size={20} color={colors.white} />;
            } else {
              return (
                <Text style={{ color: colors.white }}>
                  {route.name.toLocaleUpperCase()}
                </Text>
              );
            }
          },
          tabBarShowIcon: true,
          tabBarLabelStyle: {
            color: colors.white,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.white,
          },
          tabBarStyle: {
            backgroundColor: colors.foreground,
          },
        };
      }}
      initialRouteName="chats"
    >
      {/* <Tab.Screen name="photo" component={Photo} /> */}
      <Tab.Screen name="chats" component={Chats} />
    </Tab.Navigator>
  );
}

function Main() {
  const [assets] = useAssets(
    require("./assets/icon-square.png"),
    require("./assets/chatbg.png"),
    require("./assets/chatbg-2.png"),
    require("./assets/user-icon.png"),
    require("./assets/welcome-img.png"),
    require("./assets/welcome-img-2.png")
  );
  if (!assets) {
    return <Text>Loading ..</Text>;
  }
  return (
    <ContextWrapper>
      <App />
    </ContextWrapper>
  );
}

export default Main;
