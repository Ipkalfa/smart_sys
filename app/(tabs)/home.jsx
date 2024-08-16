import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NameField from "../../components/NameField";
import { images } from "../../constants";
import SwitchButton from "../../components/SwitchButton";
import SocketButton from "../../components/SocketButton";
// import UseAppwrite from '../../lib/UseAppwrite'
// import UseAppwrite from "../../lib/useAppwrite";


const Home = () => {
  return (
    <SafeAreaView className="bg-primary flex-1">
      <View className="px-4 py-3 flex-row justify-between">
        <View>
          <Text className="text-gray-100 font-pmedium text-sm">Welcome to</Text>
          <Text className="text-white text-2xl font-psemibold">HomeSys</Text>
        </View>
        <View>
          <Image source={images.logoh} className="w-9 h-10" resizeMode="contain" />
        </View>
      </View>
      <ScrollView className="min-h-[83vh]">
        <View className=" mx-[80px] mb-[90px] mt-[0px] justify-between ">
          <SocketButton
            title="Toggle Status"
            containerStyles="some-container-styles"
            textStyles="some-text-styles"
            isLoading={false}
            // userId={} // Pass the user ID here
          />
          <NameField title={"Smart Socket"} />
        </View>
        <View className=" mx-[80px] mb-[80px] mt-[0px] justify-between  ">
          <SwitchButton
            containerStyles="some-container-styles"
          />

          <NameField title={"Smart Switch"} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
