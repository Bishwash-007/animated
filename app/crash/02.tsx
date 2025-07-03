import { useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSpring,
  ReduceMotion,
} from "react-native-reanimated";

const width = 100;

const Example2 = () => {
  const defaultAnim = useSharedValue<number>(width / 2 - 100);
  const changedAnim = useSharedValue<number>(width / 2 - 100);

  const animatedLinear = useAnimatedStyle(() => ({
    transform: [{ translateX: defaultAnim.value }],
  }));
  const animatedChanged = useAnimatedStyle(() => ({
    transform: [{ translateX: changedAnim.value }],
  }));

  useEffect(() => {
    defaultAnim.value = withRepeat(withSpring(-defaultAnim.value), -1, true);
    changedAnim.value = withRepeat(
      withSpring(-changedAnim.value, {
        mass: 1,
        damping: 40,
        stiffness: 200,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 2,
        reduceMotion: ReduceMotion.System,
      }),
      -1,
      true
    );
  }, []);

  return (
    <SafeAreaView className="h-full flex-1 items-center justify-center gap-4">
      <Animated.View
        style={[{ width: width, backgroundColor: "black" }, animatedLinear]}
      >
        <View className="bg-black size-6" />
      </Animated.View>
      <Animated.View
        style={[{ width: width, backgroundColor: "black" }, animatedChanged]}
      >
        <View className="bg-black size-6" />
      </Animated.View>
    </SafeAreaView>
  );
};

export default Example2;
