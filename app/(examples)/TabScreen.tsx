import React, { useState } from "react";
import { View, StatusBar, TouchableOpacity, Text, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import CustomTabs from "@/components/CustomTabs";
import { ArrowLeft, icons } from "lucide-react-native";
import { router } from "expo-router";

const tabData: { iconName: keyof typeof icons; label: string }[] = [
  { iconName: "House", label: "Home" },
  { iconName: "Search", label: "Search" },
  { iconName: "User", label: "Profile" },
  { iconName: "Settings", label: "Settings" },
];

const TabScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <View style={styles.container}>
      <CustomTabs
        data={tabData}
        selectedIndex={selectedTab}
        onChange={setSelectedTab}
        activeColor="#ffffff"
        inactiveColor="#888888"
        activeBackgroundColor="#ffffff"
        inactiveBackgroundColor="#121212"
      />

      <View style={styles.content}>
        <Animated.Text style={styles.tabText}>
          {`Current Tab: ${tabData[selectedTab].label}`}
        </Animated.Text>

        <TouchableOpacity onPress={router.back} style={styles.backButton}>
          <ArrowLeft size={32} color="white" />
        </TouchableOpacity>
      </View>

      <StatusBar barStyle="light-content" backgroundColor="#121212" />
    </View>
  );
};

export default TabScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#121212",
    justifyContent: "flex-start",
    paddingTop: 80,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontSize: 24,
    color: "#ffffff",
    marginBottom: 16,
  },
  backButton: {
    padding: 10,
    backgroundColor: "#1e1e1e",
    borderRadius: 50,
  },
});