import React from "react";
import { TouchableOpacity, Text, Dimensions } from "react-native";

interface CustomButtonProps {
  title: string; 
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost";
  disabled?: boolean;
  className?: string;
  textClassName?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean; 
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  className = "",
  textClassName = "",
  icon,
  fullWidth = false,
}) => {
  const screenWidth = Dimensions.get("window").width;

  const buttonClassName = `
    flex-row items-center justify-center rounded-xl min-h-12 px-4 py-2
    ${variant === "primary" ? "bg-red-400" : ""}
    ${variant === "secondary" ? "bg-gray-500" : ""}
    ${variant === "danger" ? "bg-red-500" : ""}
    ${variant === "outline" ? "border-2 border-red-400 bg-transparent" : ""}
    ${variant === "ghost" ? "bg-transparent" : ""}
    ${disabled ? "opacity-50" : ""}
    ${fullWidth ? `w-[${screenWidth - 40}px]` : ""}
    ${className}
  `;

  const textStyles = `
    text-center font-bold text-white
    ${disabled ? "text-opacity-50" : ""}
    ${variant === "outline" || variant === "ghost" ? "text-red-400" : ""}
    ${textClassName}
  `;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={buttonClassName}
    >
      {icon && icon}
      <Text className={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;