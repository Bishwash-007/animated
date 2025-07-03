import React from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedProps,
} from "react-native-reanimated";
import { Svg, Circle } from "react-native-svg";

const Example1 = () => {
  const translateX = useSharedValue(0);
  const r = useSharedValue(10);

  const handlePress = () => {
    translateX.value += 50;
    r.value += 10;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(translateX.value * 2) }],
  }));

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const animatedProps = useAnimatedProps(() => ({
    r: withSpring(r.value),
  }));

  return (
    <TouchableOpacity onPress={handlePress} className="p-4">
      <Animated.View className="w-24 h-24 bg-red-500" style={animatedStyle} />
      <View className="h-5 w-5 bg-black mt-4" />
      <Svg height="100" width="100" className="mt-4">
        <AnimatedCircle
          cx="50"
          cy="50"
          fill="blue"
          animatedProps={animatedProps}
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default Example1;
