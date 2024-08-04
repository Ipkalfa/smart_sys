import React, { useEffect, useState } from 'react';
import { View, Dimensions, ActivityIndicator, Text, SafeAreaView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { getLatestPowerEnergyData } from '../lib/appwrite'; // Adjust the import path as needed

const PowerEnergyGraph = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { socketEnergyData, switchEnergyData, labels } = await getLatestPowerEnergyData();
        setData({
          labels,
          datasets: [
            {
              data: socketEnergyData,
              color: (opacity = 1) => `rgba(244, 246, 247, ${opacity})`, // Energy color for Smart Socket
              strokeWidth: 2 // Energy line width for Smart Socket
            },
            {
              data: switchEnergyData,
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Energy color for Smart Switch
              strokeWidth: 2 // Energy line width for Smart Switch
            }
          ],
          legend: ["Socket Energy (Wh)", "Switch Energy (Wh)"] // Labels for the datasets
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Fetch data periodically
    const intervalId = setInterval(fetchData, 10000); // Fetch data every 10 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#f1b010" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <SafeAreaView>
      <View className="justify-center">
        <LineChart
          data={data}
          width={Dimensions.get('window').width} // Width of the chart
          height={280} // Height of the chart
          chartConfig={{
            backgroundColor: "#36454F",
            backgroundGradientFrom: "#36454F",
            backgroundGradientTo: "#d68910",
            decimalPlaces: 2, // Number of decimal places
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#17202a"
            }
          }}
          bezier // Optional bezier curve for smoother lines
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default PowerEnergyGraph;
