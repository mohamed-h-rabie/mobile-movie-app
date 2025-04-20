import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { images } from "@/constants/images";

const TrendingCard = ({
  movie: { movie_id, title, poster_path },
  index,
}: TrendingCardProps) => {
  return (
    <Link href={`/movie/${movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          className="w-full h-52  rounded-lg bg-cover bg-center"
          resizeMode="cover"
        />
        <View className="absolute top-0 rounded-full left-0">
          <MaskedView
            maskElement={
              <Text className="font-bold text-6xl text-white">{index + 1}</Text>
            }
          >
            <Image source={images.rankingGradient} />
          </MaskedView>
        </View>
        <Text numberOfLines={1} className="text-white text-sm font-bold mt-2 ">
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
