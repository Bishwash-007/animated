import { View, Text, Image } from "react-native";
import React from "react";
import Icons from "@/constants/icons";

const StoreButton = () => {
  return (
    <View>
        <Image
         source={Icons.heart}
        />
        <View>
            <Text>Download on the</Text>
            <Text>App Store</Text>
        </View>
    </View>
  );
};

export default StoreButton;
