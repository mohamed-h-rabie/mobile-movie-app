import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import useFetch from "@/services/useFetch";
import { fetchPopularMovies, fetchTrendingMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import TrendingCard from "@/components/TrendingCard";

const Index = () => {
  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchPopularMovies({ query: "" }));
  const {
    data: TrendingMovies,
    loading,
    error,
  } = useFetch(() => fetchTrendingMovies());

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
          Tredning Movies
        </Text>
        {moviesLoading ? (
          <ActivityIndicator size="large" color="#D53644" className="my-3" />
        ) : (
          <FlatList
            data={TrendingMovies?.results}
            renderItem={({ item, index }) => (
              <TrendingCard movie={item} index={index} />
            )}
            horizontal
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="w-4" />}
            className="mb-4 mt-3"
          />
        )}
        <Text className="text-lg text-white font-bold mt-5 mb-3">
          Latest Movies
        </Text>

        {moviesError && (
          <Text style={{ color: "red" }}>{moviesError.message}</Text>
        )}

        {moviesLoading ? (
          <ActivityIndicator size="large" color="#D53644" className="my-3" />
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

//CACHE
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const [movie, seetMovie] = useState<Movie>();
// useEffect(() => {
//   const storeAndReadData = async () => {
//     try {
//       if (movies && movies.results?.length > 0) {
//         const data = JSON.stringify(movies.results[0]);
//         await AsyncStorage.setItem("movies", data);
//       }
//     } catch (e) {
//       console.error("AsyncStorage error", e);
//     }
//   };

//   storeAndReadData();
// }, [movies]);
// useEffect(() => {
//   const getData = async () => {
//     try {
//       const value = await AsyncStorage.getItem("movies");
//       if (value !== null) {
//         seetMovie(JSON.parse(value));
//         return value;
//       }
//     } catch (e) {
//       console.error("Reading error", e);
//     }
//   };
//   getData();
// }, []);
