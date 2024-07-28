import React from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// Graph component
const PowerEnergyGraph = () => {
  // Example data
  const data = {
    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Optional color customization
        strokeWidth: 2 // Optional line width customization
      },
      {
        data: [30, 35, 48, 40, 79, 53],
        color: (opacity = 1) => `rgba(244, 65, 134, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ["Power (kW)", "Energy (kWh)"] // Labels for the datasets
  };

  return (
    <View>
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
  );
};

export default PowerEnergyGraph
