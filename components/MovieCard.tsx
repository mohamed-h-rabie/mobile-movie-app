import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          className="w-full h-60 rounded-lg bg-cover bg-center"
          resizeMode="cover"
        />
        <Text numberOfLines={1} className="text-white text-sm font-bold mt-2 ">
          {title}
        </Text>
        <View className="flex flex-row items-center justify-start">
          <Image source={icons.star} className="size-5" />
          <Text className="text-white ml-1">
            {Math.round(vote_average / 2)}
          </Text>
        </View>
        <View className="flex flex-row items-center justify-start">
          <Text className="text-light-100 mt-1">
            {release_date.split("-")[0]}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
