import React from "react";
import { TouchableOpacity, Text, Dimensions, View } from "react-native";

interface OAuthButtonProps {
  title: string;
  onPress: () => void;
  icon: React.ReactNode;
  provider?: "google" | "github" | "facebook" | "twitter" | "custom";
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  textClassName?: string;
}

const OAuthButton: React.FC<OAuthButtonProps> = ({
  title,
  onPress,
  icon,
  provider = "custom",
  disabled = false,
  fullWidth = false,
  className = "",
  textClassName = "",
}) => {
  const screenWidth = Dimensions.get("window").width;

  const providerStyles: Record<string, string> = {
    google: "bg-white border border-gray-300",
    github: "bg-black",
    facebook: "bg-blue-600",
    twitter: "bg-sky-500",
    custom: "bg-gray-700",
  };

  const textColors: Record<string, string> = {
    google: "text-black",
    github: "text-white",
    facebook: "text-white",
    twitter: "text-white",
    custom: "text-white",
  };

  const buttonClassName = `
    flex-row items-center justify-center rounded-xl min-h-12 px-4 py-2 space-x-3
    ${providerStyles[provider]}
    ${disabled ? "opacity-50" : ""}
    ${fullWidth ? `w-[${screenWidth - 40}px]` : ""}
    ${className}
  `;

  const textStyles = `
    text-center text-base font-semibold
    ${textColors[provider]}
    ${textClassName}
  `;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={buttonClassName}
    >
      <View className="mr-2">{icon}</View>
      <Text className={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

export default OAuthButton;