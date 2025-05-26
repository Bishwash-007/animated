import React from "react";
import { Text, TouchableOpacity } from "react-native";
import ReactNativeModal from "react-native-modal";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";

interface AnimatedModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  backdropColor?: string;
  animationInTiming?: number;
  animationOutTiming?: number;
}

const Modal: React.FC<AnimatedModalProps> = ({
  visible,
  onClose,
  title,
  children,
  className = "",
  backdropColor = "rgba(0, 0, 0, 0.4)",
  animationInTiming = 300,
  animationOutTiming = 200,
}) => {
  return (
    <ReactNativeModal
      isVisible={visible}
      onBackdropPress={onClose}
      useNativeDriver
      backdropColor={backdropColor}
      backdropOpacity={1}
      animationInTiming={animationInTiming}
      animationOutTiming={animationOutTiming}
      style={{ margin: 0, justifyContent: "center", alignItems: "center" }}
    >
      <Animated.View
        entering={FadeInUp}
        exiting={FadeOutDown}
        className={`
          bg-white rounded-2xl p-6 w-[90%] shadow-lg shadow-black/10
          ${className}
        `}
      >
        {title && (
          <Text className="text-xl font-bold text-center mb-4">{title}</Text>
        )}

        {children}

        <TouchableOpacity
          onPress={onClose}
          className="mt-5 self-center px-4 py-2 bg-red-500 rounded-xl"
        >
          <Text className="text-white font-semibold">Close</Text>
        </TouchableOpacity>
      </Animated.View>
    </ReactNativeModal>
  );
};

export default Modal;