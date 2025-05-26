import React from "react";
import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from "react-native";
import { useRouter } from "expo-router";

interface CardProps {
  title: string; 
  subtitle?: string; 
  imageSource: ImageSourcePropType; 
  targetRoute: string; 
  paramKey?: string; 
  paramValue?: string | number; 
  rating?: number; 
  reviewCount?: number; 
  footerText?: string; 
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  imageSource,
  targetRoute,
  paramKey,
  paramValue,
  rating,
  reviewCount,
  footerText,
}) => {
  const router = useRouter();

  const redirectToTargetRoute = () => {
    if (paramKey && paramValue) {
      router.push({
        pathname: targetRoute as any,
        params: { [paramKey]: paramValue }
      });
    } else {
      router.push({ pathname: targetRoute as any });
    }
  };

  return (
    <TouchableOpacity
      onPress={redirectToTargetRoute}
      className="p-2 rounded-lg w-[140px] m-3 bg-white shadow-md"
    >
      {/* Image */}
      <Image
        source={imageSource}
        className="mb-2 h-[160px] w-full rounded-md"
        resizeMode="cover"
      />

      {/* Title and Subtitle */}
      <View className="flex flex-col items-start space-y-1">
        <Text
          className="text-base font-semibold text-typography-800"
          numberOfLines={1}
        >
          {title.length > 20 ? `${title.substring(0, 20)}...` : title}
        </Text>
        {subtitle && (
          <Text className="text-sm font-normal text-typography-600">
            {subtitle}
          </Text>
        )}
      </View>

      {/* Rating and Reviews */}
      {(rating !== undefined || reviewCount !== undefined) && (
        <View className="flex-row items-center mt-2">
          {rating !== undefined && (
            <Text className="text-xs font-medium text-yellow-500">
              ⭐ {rating.toFixed(1)}
            </Text>
          )}
          {reviewCount !== undefined && (
            <Text className="text-xs font-normal text-typography-700 ml-2">
              ({reviewCount} reviews)
            </Text>
          )}
        </View>
      )}

      {/* Footer Text */}
      {footerText && (
        <View className="mt-2">
          <Text
            className="text-xs font-medium text-typography-500"
            numberOfLines={1}
          >
            {footerText}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Card;