import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { Link } from "expo-router";
import type { LinkProps } from "expo-router";
import Animated, {
  interpolate,
  LinearTransition,
} from "react-native-reanimated";

const links: { href: LinkProps["href"]; label: string }[] = [
  { href: "/TabScreen", label: "Animated Tabs" },
  { href: "/themeswitcher", label: "Theme Switcher" },
  { href: "/swiper", label: "Swiper" },
  { href: "/storyui", label: "Story UI Example" },
];

const Index = () => {
  return (
    <Animated.ScrollView
      contentContainerStyle={styles.container}
    >
      <Text style={styles.title}>Reanimated</Text>

      {links.map((link, idx) => (
        <Link key={idx} href={link.href} asChild>
          <Pressable style={styles.linkButton}>
            <Text style={styles.linkText}>{link.label}</Text>
          </Pressable>
        </Link>
      ))}

      <Text style={styles.footerText}>React Native Reanimated Example!</Text>
    </Animated.ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 80,
    backgroundColor: "#121212",
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: 24,
  },
  linkButton: {
    backgroundColor: "#1e1e1e",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#2c2c2c",
  },
  linkText: {
    color: "#ffffff",
    fontSize: 16,
  },
  footerText: {
    marginTop: 40,
    fontSize: 18,
    color: "#999999",
  },
});
