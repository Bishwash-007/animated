import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const Expamle4 = () => {
  const pressed = useSharedValue<boolean>(false);
  const offset = useSharedValue({ x: 0, y: 0 });

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange((event) => {
      offset.value.x = event.translationX;
      offset.value.y = event.translationX;
    })
    .onFinalize(() => {
      offset.value.x = withSpring(0);
      offset.value.y = withSpring(0);
      pressed.value = false;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value.x }, { translateY: offset.value.y }],
    backgroundColor: pressed.value ? "blue" : "red",
    opacity: pressed.value ? 0.5 : 1,
  }));

  return (
    <GestureHandlerRootView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[{ height: 20, width: 20, borderRadius: 20 }, animatedStyles]}
        ></Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default Expamle4;
