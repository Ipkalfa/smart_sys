import { View, Text } from 'react-native'
import React from 'react'

const DeviceData = ({value: {deviceid,status} }) => {
  return (
    <View className="flex-col items-center px-4 mb-14 ">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
            <View className="w-[226px] h-[40px] rounded-lg border border-secondary-100 justify-center items-ce  p-0.5">
 
            </View>
            <View className="justify-center flex-1 items-center  ml-3 gap-y-1">
                <Text className=" text-white">{deviceid} </Text>
                <Text className=" text-white">{status}</Text>

            </View>
        </View>

      </View>
      

      

    </View>
  )
}

export default DeviceData