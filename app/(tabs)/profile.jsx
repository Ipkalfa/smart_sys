import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import DeviceData from "../../components/DeviceData";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getDeviceStatus, signOut } from "../../lib/appwrite";
import InfoBox from "../../components/InfoBox";
import { icons } from "../../constants";
import { useRouter } from "expo-router";

const Profile = () => {
  const { user, setUser, setisLoggedIn } = useGlobalContext();
  const [deviceDatas, setDeviceDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchDeviceData = async () => {
    if (!user) {
      setLoading(false);
      setRefreshing(false);
      return;
    }

    try {
      const data = await getDeviceStatus();
      console.log("Device Data:", data);
      setDeviceDatas(data.documents);
    } catch (error) {
      console.error("Error fetching device data:", error);
      setError(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDeviceData();
  }, [user]);

  const logout = async () => {
    await signOut();
    setUser(null);
    setisLoggedIn(false);
    router.replace("/sign_in");
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDeviceData();
  };

  if (loading) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <ActivityIndicator size="large" color="#f1b010 " />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <Text>Error: {error.message}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      {/* <Text className="text-white">{JSON.stringify({ data: deviceDatas })}</Text> */}
      <FlatList
        data={deviceDatas}
        keyExtractor={(item) => item.$id.toString()}
        renderItem={({ item }) => <DeviceData deviceid={item.deviceName} status={item.status} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity className="w-full items-end mb-10" onPress={logout}>
              <Image source={icons.logout} resizeMode="contain" className="w-6 h-6" />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              {user?.avatar ? (
                <Image
                  source={{ uri: user?.avatar }}
                  className="w-[90%] h-[90%] rounded-lg"
                  resizeMode="cover"
                  onError={(error) => console.log("Error loading avatar:", error.nativeEvent.error)}
                />
              ) : (
                <Text className="text-white">No Avatar</Text>
              )}
            </View>
            <InfoBox title={user?.username} containerStyles="mt-5" titleStyles="text-lg" />
            <View className="mt-5 flex-row">
              <InfoBox title={deviceDatas.length} subtitle="Devices connected" titleStyles="text-xl" />
            </View>
          </View>
        )}
        ListEmptyComponent={() => <EmptyState title="No Devices Found." />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Profile;
