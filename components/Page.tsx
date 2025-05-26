import { Dimensions, View, StyleSheet } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  SharedValue,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";

interface PageProps {
  index: number;
  title: string;
  translateX: SharedValue<number>;
}

const { height, width } = Dimensions.get("screen");
const SIZE = width * 0.7;

const Page: React.FC<PageProps> = ({ index, title, translateX }) => {
  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, 1, 0],
      Extrapolation.CLAMP
    );
    // Animate borderRadius from 20 (square) to SIZE/2 (circle) and back
    const borderRadius = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [20, SIZE / 2, 20],
      Extrapolation.CLAMP
    );
    return {
      borderRadius,
      transform: [{ scale }],
    };
  });
  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [height, 1, height/6]
    );
    const opacity = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [1, 1, 1],
      Extrapolation.CLAMP
    );
    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `rgba(255, 0, 0, ${0.2 + index * 0.1})` },
      ]}
    >
      <Animated.View style={[styles.square, rStyle]}>
        <Animated.Text
          style={[
            styles.title,
            rTextStyle,
            // color will animate with opacity
            // You can adjust the color as needed
            // For example, use black text with animated opacity:
            // { color: `rgba(0,0,0,${rTextStyle.opacity})` }
          ]}
        >
          {title}
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height,
    width,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    height: SIZE,
    width: SIZE,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 48,
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default Page;
