import { View, Text } from 'react-native'
import React from 'react'

const MeasuredValues = ({value: {measurement_id, timestamp, voltage, current, power, Energy} }) => {
  return (
    <View className="flex-col items-center px-4 mb-14 ">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
            <View className="w-[46px] h-[46px] rounded-lg border border-secondary-100 justify-center  items-center p-0.5">
                
            </View>
            <View className="justify-center flex-1 items-center  ml-3 gap-y-1">
                <Text className=" text-white">{measurement_id}</Text>
                <Text className=" text-white">{timestamp}</Text>
                <Text className=" text-white">{voltage} Volts</Text>
                <Text className=" text-white">{current} Apms</Text>
                <Text className=" text-white">{power} Watt</Text>
                <Text className=" text-white">{Energy} kWh</Text>
            </View>
        </View>

      </View>
      

      

    </View>
  )
}

export default MeasuredValues