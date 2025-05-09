import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import { Image, ImageBackground, Text, View } from "react-native";
function TabIcon({ focused, icon, title }: any) {
  if (focused) {
    return (
      <ImageBackground
        className="flex flex-1 flex-row w-full  min-w-[110px] min-h-16 justify-center items-center rounded-full overflow-hidden mt-4  "
        source={images.highlight}
      >
        <Image tintColor="#151312" className="size-5" source={icon} />
        <Text className="text-secondary text-base font-semibold ml-2">
          {title}
        </Text>
      </ImageBackground>
    );
  }

  return (
    <View className=" size-full justify-center items-center mt-4 ">
      <Image source={icon} tintColor="#A8B5DB" className="size-4" />
    </View>
  );
}
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0F0D23",
          borderRadius: 50,
          marginHorizontal: 15,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "transparent",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return <TabIcon focused={focused} icon={icons.home} title="Home" />;
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon focused={focused} icon={icons.search} title="Search" />
            );
          },
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon focused={focused} icon={icons.save} title="Saved" />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon focused={focused} icon={icons.person} title="Profile" />
            );
          },
        }}
      />
    </Tabs>
  );
}
