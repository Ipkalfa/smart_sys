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
        const { powerData, energyData, labels } = await getLatestPowerEnergyData();
        setData({
          labels,
          datasets: [
            {
              data: powerData,
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Power color
              strokeWidth: 2 // Power line width
            },
            {
              data: energyData,
              color: (opacity = 1) => `rgba(244, 65, 134, ${opacity})`, // Energy color
              strokeWidth: 2 // Energy line width
            }
          ],
          legend: ["Power (kW)", "Energy (kWh)"] // Labels for the datasets
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
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <SafeAreaView>
      <View className="pr-6 pt-6">
        <LineChart
          data={data}
          width={Dimensions.get('window').width} // Width of the chart
          height={220} // Height of the chart
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // Number of decimal places
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
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
