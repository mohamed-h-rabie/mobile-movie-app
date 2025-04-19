import { View, Text, Image, TextInput, TextInputProps } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
type SearchBarProps = {
  onPress?: () => void;
  placeholder: string;
  value?: string;
  onChangeText?: (query: string) => void;
};
const SearchBar = ({
  onPress,
  placeholder,
  value,
  onChangeText,
}: SearchBarProps) => {
  return (
    <View className="flex flex-row justify-center items-center mt-10 bg-dark-200 rounded-full px-5 py-1">
      <Image
        resizeMode="contain"
        tintColor="#ab8bff"
        className="size-5"
        source={icons.search}
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className="flex-1 ml-2 text-white"
        placeholderTextColor="#A8B5DB"
      />
    </View>
  );
};

export default SearchBar;
