import React from "react";
import { Text, TouchableOpacity, Image, View, ImageSourcePropType } from "react-native";

interface ListItemProps {
  title: string;
  icon?: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  className?: string;
  textClassName?: string;
  iconSource?: ImageSourcePropType; // optional alternative to ReactNode icon
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  icon,
  iconSource,
  onPress,
  disabled = false,
  className = "",
  textClassName = "",
}) => {
  const containerClassName = `
    flex-row items-center px-4 py-3 border-b border-gray-100
    ${disabled ? "opacity-50" : ""}
    ${className}
  `;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={containerClassName}
    >
      {/* Icon on the left (ReactNode or Image) */}
      {icon ? (
        <View className="mr-4">{icon}</View>
      ) : iconSource ? (
        <Image
          source={iconSource}
          className="w-6 h-6 mr-4"
          resizeMode="contain"
        />
      ) : null}

      {/* Title in center */}
      <Text
        className={`text-lg font-bold flex-1 text-center ${textClassName}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ListItem;