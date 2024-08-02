import { View, Text } from "react-native";
import React from "react";

import { formatDate } from "../lib/date";
const MeasuredValues = ({ value: { measurement_id, timestamp, voltage, current, power, Energy } }) => {
  return (
    <View className="flex-col items-center px-4 mb-14 ">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[226px] text-wrap h-[40px] rounded-lg border border-secondary-100 justify-center items-ce  p-0.5">
            {/* <Text className=" text-white">{measurement_id}</Text>  */}
            <Text className=" text-white font-pregular text-wrap text-sm">{formatDate(timestamp)}</Text>
          </View>
          <View className="justify-center flex-1 items-center  ml-3 gap-y-1">
            <Text className=" text-white font-pregular text-lg">{voltage} Volts</Text>
            <Text className=" text-white font-pregular text-lg">{current} Amps</Text>
            <Text className=" text-white font-pregular text-lg">{power} Watt</Text>
            <Text className=" text-white font-pregular text-lg">{Energy} kWh</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MeasuredValues;
