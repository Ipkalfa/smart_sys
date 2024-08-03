import { View, Text, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";

const DeviceData = ({ deviceid, status }) => {
  const [deviceData, setDeviceData] = useState({ deviceid, status });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming deviceid and status are already passed as props and setDeviceData is not needed
        setDeviceData({ deviceid, status });
      } catch (error) {
        console.error("Error fetching device data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [deviceid, status]);

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1 ">
          <View className="w-[150px] h-[40px] rounded-lg border border-secondary-100 justify-center items-center p-0.5">
            <Text className="text-white font-psemibold text-lg ">{deviceData.deviceid}</Text>
          </View>
          <View className="justify-center flex-1 items-center ml-3 gap-y-1">
            <Text className="text-white font-psemibold">{deviceData.status ? "Active" : "Inactive"}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DeviceData;
