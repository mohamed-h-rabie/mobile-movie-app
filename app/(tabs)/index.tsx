import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import axios from "axios";
import useFetch from "@/services/useFetch";
import { fetchPopularMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
const Index = () => {
  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchPopularMovies({ query: "" }));
  return (
    <View className="bg-dark-200 h-full flex flex-1 min-w-full">
      <Image source={images.bg} className="absolute z-0 " />

      <ScrollView
        className="px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="mx-auto w-12 h-10 mt-5" />
        <SearchBar
          onPress={() => router.push("/search")}
          placeholder="Search for a movie"
        />
        <Text className="text-lg text-white font-bold mt-5 mb-3">
          Latest Movies
        </Text>
        {moviesError && (
          <Text style={{ color: "red" }}>{moviesError.message}</Text>
        )}

        {moviesLoading ? (
          <Text>Loading...</Text>
        ) : moviesError ? (
          <Text style={{ color: "red" }}>{moviesError.message}</Text>
        ) : (
          <FlatList
            data={movies?.results}
            renderItem={({ item }) => <MovieCard {...item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            scrollEnabled={false}
            columnWrapperStyle={{
              gap: 20,
              justifyContent: "flex-start",
              paddingRight: 5,
              marginBottom: 10,
            }}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            className="mt-3"
          />
        )}
      </ScrollView>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
