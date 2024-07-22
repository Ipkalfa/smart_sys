// import React, { useState, useEffect } from 'react';
// import { View, Text, Dimensions, ScrollView } from 'react-native';
// import { LineChart } from 'react-native-chart-kit';
// import { databases } from '../lib/appwrite';


// const screenWidth = Dimensions.get('window').width;

// const DataDisplay = () => {
//   return (
//     <ScrollView >
//       <View>
//         {error ? (
//           <Text>{error}</Text>
//         ) : (
//           <>
//             <Text>Power and Energy over Time</Text>
//             <LineChart
//               data={{
//                 labels: timestamps,
//                 datasets: [
//                   {
//                     data: powerData,
//                     color: (opacity = 1) => rgba(255, 0, 0, {opacity}), // Red
//                     strokeWidth: 2,
//                     label: 'Power'
//                   },
//                   {
//                     data: energyData,
//                     color: (opacity = 1) => rgba(0, 0, 255, {opacity}), // Blue
//                     strokeWidth: 2,
//                     label: 'Energy'
//                   }
//                 ],
//                 legend: ["Power", "Energy"]
//               }}
//               width={screenWidth - 16} // Width of the graph
//               height={220} // Height of the graph
//               chartConfig={{
//                 backgroundColor: '#ffffff',
//                 backgroundGradientFrom: '#ffffff',
//                 backgroundGradientTo: '#ffffff',
//                 decimalPlaces: 2,
//                 color: (opacity = 1) => rgba(0, 0, 0, {opacity}),
//                 labelColor: (opacity = 1) => rgba(0, 0, 0, {opacity}),
//                 style: {
//                   borderRadius: 16
//                 },
//                 propsForDots: {
//                   r: '6',
//                   strokeWidth: '2',
//                   stroke: '#ffa726'
//                 }
//               }}
//               bezier
//               style={{
//                 marginVertical: 8,
//                 borderRadius: 16
//               }}
//             />
//           </>
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// export default DataDisplay;