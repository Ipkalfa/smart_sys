import { View, Text, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { appwConfig, client, getLatestReadings } from "../lib/appwrite"; // Adjust the import path as needed
const DataDisplay = ({ title, Title, unit, deviceId, otherStyles }) => {
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLatestReadings(deviceId);
        setValue(data[title.toLowerCase()]); // Assume title matches key in data
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Fetch data initially
    fetchData();

    const unsubscribe = client.subscribe(
      `databases.${appwConfig.databaseId}.collections.${appwConfig.measurementId}.documents`,
      (response) => {
        // console.log(response);

        if (response.events.includes("databases.*.collections.*.documents.*.create")) {
          fetchData();
          // console.log("New Event Created");
          // console.log(response.payload);
          // we can call  the fetch data function
        }
      }
    );

    // Fetch data periodically
    // const intervalId = setInterval(fetchData, 10000); // Fetch data every 10 seconds

    // Cleanup interval on component unmount
    return () => {
      // clearInterval(intervalId)
      unsubscribe();
    };
  }, [title, deviceId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#f1b010" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View>
      <Text className="text-lg text-gray-100 font-pmedium"> {Title}</Text>
      <View className={`space-y-2 items-center ${otherStyles}`}>
        <Text className="text-lg text-gray-100 font-pmedium"> {title}</Text>
        <View className="border-2 border-secondary-100 w-34 h-9 px-4 bg-black-200 rounded-xl focus:border-secondary  items-center">
          <Text className="flex-1 text-white font-psemibold text-xl">
            {value} {unit}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DataDisplay;
