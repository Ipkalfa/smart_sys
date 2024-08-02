import React, { useState, useCallback } from 'react';
import { View, Text, Image, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import DataDisplay from '../../components/DataDisplays';
import { useGlobalContext } from '../../context/GlobalProvider';
import PowerEnergyChart from '../../components/graph';

const Monitoring = () => {
  const { user, measurement, setUser, setisLoggedIn } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);

  // Function to handle refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Perform your refresh logic here, e.g., fetch new data
      // Example: await fetchData();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <SafeAreaView className="bg-primary flex-1">
      <View className="my-6 px-4 space-y-6">
        <View className="justify-between items-start flex-row mb-6">
          <View>
            <Text className="font-pmedium text-sm text-gray-100">
              Monitor Your Consumption,
            </Text>
            <Text className="text-2xl font-psemibold text-white">
              {user?.username}
            </Text>
          </View>
          <View className="mt-1.5">
            <Image
              source={images.logoh}
              className="w-9 h-10"
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#00ff00']} // Customize the refresh control color if needed
          />
        }
      >
        <View className="justify-center">
          <View className="justify-center items-center">
            <Text className="text-white text-4xl font-bold">Monitoring</Text>
            <PowerEnergyChart />
          </View>
        </View>
        <View className="flex-row justify-evenly p-4">
          <DataDisplay title="Voltage" unit="V" otherStyles="" />
          <DataDisplay title="Current" unit="A" otherStyles="" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Monitoring;
