import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Avatar,
  Caption,
  Drawer,
  Paragraph,
  Title,
  useTheme,
} from "react-native-paper";
import Icon from "react-native-vector-icons/Feather";
import { useAuth } from "../../../Contexts/AuthContext";
import { dashboardScreenProp } from "../../Routes/AppRoutes";

export const DrawerContent = (props: any) => {
  const paperTheme = useTheme();
  const { signOut, user } = useAuth();
  const navigation = useNavigation<dashboardScreenProp>();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: "https://api.adorable.io/avatars/50/abott@adorable.png",
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>{user?.name}</Title>
                <Caption style={styles.caption}>{user?.email}</Caption>
              </View>
            </View>
          </View>
        </View>

        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            )}
            label="Home"
            onPress={() => {
              navigation.navigate("Home");
            }}
          />

          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="activity" color={color} size={size} />
            )}
            label="Remotes"
            onPress={() => {
              navigation.navigate("Remotes");
            }}
          />

          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="user" color={color} size={size} />
            )}
            label="Profile"
            onPress={() => {}}
          />

          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="bookmark" color={color} size={size} />
            )}
            label="Bookmarks"
            onPress={() => {}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="settings" color={color} size={size} />
            )}
            label="Settings"
            onPress={() => {
              navigation.navigate("Settings");
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="message-circle" color={color} size={size} />
            )}
            label="Support"
            onPress={() => {
              navigation.navigate("Support");
            }}
          />
        </Drawer.Section>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="log-out" color={color} size={size} />
            )}
            label="Sign Out"
            onPress={() => {
              signOut();
            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
