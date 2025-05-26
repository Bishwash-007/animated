import {
  StatusBar,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { BACKGROUND_COLOR, Stories } from "@/constants/images";
import StoryListItems, { HEIGHT, WIDTH } from "@/components/StoryListItems";
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
} from "react-native-reanimated";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

const StoryUi = () => {
  const animatedref = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(animatedref);

  const ListPadding: number = Dimensions.get("window").width - WIDTH;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <TouchableOpacity onPress={router.back} style={styles.backButton}>
        <ArrowLeft size={32} color="white" />
      </TouchableOpacity>

      <View style={styles.storyWrapper}>
        <Animated.ScrollView
          ref={animatedref}
          snapToInterval={WIDTH}
          horizontal
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            width: WIDTH * Stories.length + ListPadding,
          }}
        >
          {Stories.map((story, index) => (
            <StoryListItems
              key={index}
              imageSource={story.image}
              index={index}
              scrollOffset={scrollOffset}
            />
          ))}
        </Animated.ScrollView>
      </View>
    </View>
  );
};

export default StoryUi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 100,
    padding: 10,
    borderRadius: 999,
  },
  storyWrapper: {
    height: HEIGHT,
    width: "100%",
  },
});