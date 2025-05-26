import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

interface SearchBarProps {
  placeholder: string;
  onSearch: (searchText: string) => void;
  searchIcon: any;
  clearIcon: any;
  voiceIcon: any;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  onSearch,
  searchIcon,
  clearIcon,
  voiceIcon,
}) => {
  const [searchText, setSearchText] = useState<string>("");

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
    onSearch(text);
  };

  const clearSearch = () => {
    setSearchText("");
    onSearch("");
  };

  return (
    <View className="flex-row items-center px-4 py-2 rounded-full bg-white shadow-sm border border-gray-200">

      {voiceIcon && (
        <TouchableOpacity
          className="m-2"
          onPress={() => console.log("Voice search pressed")}
        >
          <Image source={voiceIcon} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      )}
      {/* Search Input */}˝
      <TextInput
        className="flex-1 text-base text-typography-800"
        placeholder={placeholder}
        value={searchText}
        onChangeText={handleSearchTextChange}
        placeholderTextColor="#999"
      />
      {/* Search Icon */}
      <Image
        source={searchIcon}
        style={{ width: 20, height: 20, marginRight: 8 }}
      />
      {/* Clear Icon */}
      <TouchableOpacity onPress={clearSearch} className="ml-2">
        <Image source={clearIcon} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
