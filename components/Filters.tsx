import React from "react";
import {
  Text,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";

interface FilterChipsProps<T> {
  data: T[];
  selected: string;
  onSelect: (value: string) => void;
  extractLabel: (item: T) => string;
  extractValue: (item: T) => string;
  containerStyle?: ViewStyle;
  chipStyle?: ViewStyle;
  textStyle?: TextStyle;
}

function FilterChips<T>({
  data,
  selected,
  onSelect,
  extractLabel,
  extractValue,
  containerStyle,
  chipStyle,
  textStyle,
}: FilterChipsProps<T>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={containerStyle}
      className="mt-3 mb-2"
    >
      {data.map((item, index) => {
        const value = extractValue(item);
        const label = extractLabel(item);
        const isSelected = selected === value;

        return (
          <TouchableOpacity
            key={index}
            onPress={() => onSelect(isSelected ? "" : value)}
            className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${
              isSelected
                ? "bg-primary-500"
                : "bg-primary-100 border border-primary-200"
            }`}
            style={chipStyle}
          >
            <Text
              className={`text-sm ${
                isSelected
                  ? "text-primary font-rubik-bold mt-0.5"
                  : "text-black-300 font-rubik"
              }`}
              style={textStyle}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

export default FilterChips;