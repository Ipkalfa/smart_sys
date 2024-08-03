import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Image, ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import DataDisplay from "../../components/DataDisplays";
import { useGlobalContext } from "../../context/GlobalProvider";
import PowerEnergyChart from "../../components/graph";
import { getLatestReadings } from "../../lib/appwrite"; // Ensure correct path to your api file

const Monitoring = () => {
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // Function to handle refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const readingsSmartSocket = await getLatestReadings("Smart Socket");
      const readingsSmartSwitch = await getLatestReadings("Smart Switch");

      // Calculate total price
      const totalPrice = (readingsSmartSocket.price || 0) + (readingsSmartSwitch.price || 0);
      setTotalPrice(totalPrice);
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const readingsSmartSocket = await getLatestReadings("Smart Socket");
        const readingsSmartSwitch = await getLatestReadings("Smart Switch");

        // Calculate total price
        const totalPrice = (readingsSmartSocket.price || 0) + (readingsSmartSwitch.price || 0);
        setTotalPrice(totalPrice);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView className="bg-primary flex-1">
      <View className="my-6 px-4 space-y-6">
        <View className="justify-between items-start flex-row mb-6">
          <View>
            <Text className="font-pmedium text-sm text-gray-100">Monitor Your Consumption,</Text>
            <Text className="text-2xl font-psemibold text-white">{user?.username}</Text>
          </View>
          <View className="mt-1.5">
            <Image source={images.logoh} className="w-9 h-10" resizeMode="contain" />
          </View>
        </View>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#00ff00"]} // Customize the refresh control color if needed
          />
        }
      >
        <View className="justify-center px-2">
          <View className="justify-center items-center">
            <Text className="text-white text-4xl font-bold">Monitoring</Text>
            <PowerEnergyChart />
          </View>
        </View>
        <View className="justify-between">
          <View className="flex-row justify-evenly p-4">
            <DataDisplay Title="Smart Socket" title="Voltage" unit="V" deviceId="Smart Socket" otherStyles="" />
            <DataDisplay Title="Smart Socket" title="Current" unit="A" deviceId="Smart Socket" otherStyles="" />
          </View>
          <View className="flex-row justify-evenly p-4">
            <DataDisplay Title="Smart Switch" title="Voltage" unit="V" deviceId="Smart Switch" otherStyles="" />
            <DataDisplay Title="Smart Switch" title="Current" unit="A" deviceId="Smart Switch" otherStyles="" />
          </View>
          <View className="justify-center items-center p-4">
            <Text className="text-white text-2xl font-bold">Bill: GH₵ {totalPrice.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Monitoring;
