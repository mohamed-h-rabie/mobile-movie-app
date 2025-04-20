import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchPopularMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

const search = () => {
  const [query, setQuery] = useState("");
  const { data, loading, error, refetch, reset } = useFetch(
    () => fetchPopularMovies({ query }),
    false
  );
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.length > 0) {
        refetch();
      } else {
        reset();
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);
  return (
    <View className="bg-dark-200 h-full flex flex-1 min-w-full">
      <Image source={images.bg} className="absolute z-0" />
      <FlatList
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-5 px-5">
              <Text className="text-center text-gray-500">
                {query.length > 0
                  ? "No movies found"
                  : "Start typing to search for movies"}
              </Text>
            </View>
          ) : null
        }
        data={data?.results}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 10,
          marginInline: "auto",
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-10 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <SearchBar
                placeholder="Search for a movie"
                value={query}
                onChangeText={(text: string) => setQuery(text)}
              />
            </View>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#D53644"
                className="my-3"
              />
            )}
            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}
            {!loading &&
              !error &&
              query.length > 0 &&
              data?.results?.length > 0 && (
                <Text className="text-white font-bold text-lg">
                  Search Results for :{" "}
                  <Text className="text-accent">{query}</Text>
                </Text>
              )}
          </>
        }
      />
    </View>
  );
};

export default search;

const styles = StyleSheet.create({});
