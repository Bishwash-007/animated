import { Dimensions, ImageSourcePropType, Image } from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

interface StoryListItemsProps {
  index: number;
  imageSource: ImageSourcePropType;
  scrollOffset: SharedValue<number>;
}

export const WWITH: number = Dimensions.get("window").width;
export const WIDTH: number = WWITH * 0.8;
export const HEIGHT: number = (WIDTH / 3) * 4;

const StoryListItems: React.FC<StoryListItemsProps> = ({
  index,
  imageSource,
  scrollOffset,
}) => {
  const rContainerStyle = useAnimatedStyle(() => {
    const activeIndex = scrollOffset.value / WIDTH;

    const paddingLeft = (WWITH - WIDTH) / 4;

    const translateX = interpolate(
      activeIndex,
      [index - 2, index - 1, index, index + 1],
      [120, 60, 0, -WIDTH - paddingLeft],
      Extrapolation.CLAMP
    );
    const scale = interpolate(
      activeIndex,
      [index - 2, index - 1, index, index + 1],
      [0.8, 0.9, 1, 1],
      Extrapolation.CLAMP
    );
    return {
      left: 20,
      transform: [
        {
          translateX: scrollOffset.value + translateX,
        },
        {
          scale: scale,
        },
      ],
    };
  }, []);
  return (
    <Animated.View
      style={[
        {
          zIndex: -index,
        },
        rContainerStyle,
      ]}
    >
      <Image
        source={imageSource}
        style={{
          height: HEIGHT,
          width: WIDTH,
          borderRadius: 32,
          position: "absolute",
        }}
      />
    </Animated.View>
  );
};

export default StoryListItems;
