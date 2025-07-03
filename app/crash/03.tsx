import { View, Text, TouchableOpacity } from "react-native";
import React, { use } from "react";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
} from "react-native-reanimated";

const Example3 = () => {
  const offset = useSharedValue<number>(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -offset.value + 50 }],
  }));

  function handleButtonPress() {
    offset.value = withSequence(
      withTiming(-offset.value, { duration: 200 / 2 }),
      // shake between -OFFSET and OFFSET 5 times
      withRepeat(withTiming(offset.value + 200, { duration: 200 }), -1, true),
      // go back to 0 at the end
      withTiming(0, { duration: 200 / 2 })
    );
    console.log("Button Pressed", offset.value);
  }

  return (
    <View className="h-full flex-1 items-center justify-center gap-4">
      <TouchableOpacity onPress={handleButtonPress}>
        <Animated.View
          style={[
            {
              height: 100,
              width: 100,
              backgroundColor: "black",
              borderRadius: 200,
            },
            animatedStyle,
          ]}
        ></Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default Example3;
