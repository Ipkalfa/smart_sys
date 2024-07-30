import { View, Text, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getLatestReadings } from '../lib/appwrite'; // Adjust the import path as needed

const DataDisplay = ({ title, unit, otherStyles }) => {
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLatestReadings();
        setValue(data[title.toLowerCase()]); // Assume title matches key in data
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Fetch data initially
    fetchData();

    // Fetch data periodically
    const intervalId = setInterval(fetchData, 10000); // Fetch data every 10 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [title]);

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View className={`space-y-2 items-center ${otherStyles}`}>
      <Text className="text-xl text-gray-100 font-pmedium">{title}</Text>
      <View className="border-2 border-secondary-100 w-28 h-9 px-4 bg-black-200 rounded-2xl focus:border-secondary  items-center">
        <Text className="flex-1 text-white font-psemibold text-lg">
          {value} {unit}
        </Text>
      </View>
    </View>
  );
};

export default DataDisplay;