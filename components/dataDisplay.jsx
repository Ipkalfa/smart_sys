// import React, { useState, useEffect } from 'react';
// import { View, Text} from 'react-native';
// import { databases } from '../lib/appwrite';


// const DataDisplay = () => {
//   const [data, setData] = useState('Loading...');

//   const fetchData = async () => {
//     try {
//       const response = await databases.listDocuments('6678637e001d16c11cc2', '667866d0002045fd0375');
//       setData(response.documents[0]?.data || 'No data found');
//     } catch (error) {
//       console.error(error);
//       setData('Error fetching data');
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     const intervalId = setInterval(fetchData, 2000); // Fetch data every 2 seconds

//     return () => clearInterval(intervalId); // Cleanup interval on component unmount
//   }, []);

//   return (
//     <View className={`bg-secondary border border-secondary-200 rounded-xl min-h-[px] justify-center items-center `}>
//       <Text className="text-1xl text-white ">{data}</Text>
//     </View>
//   );
// };

// export default DataDisplay;