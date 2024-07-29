import { View, Text, } from 'react-native'
import React, { useState } from 'react'


const DataDisplay = ({title, value, unit, otherStyles}) => {
    
  return (
    <View className={`space-y-2 items-center ${otherStyles}`}>
      <Text className="text-xl text-gray-100 font-pmedium ">{title}</Text>
      <View className= " border-2 border-red-500w-full h-16 px-4 bg-black-200 rounded-2xl focus:border-secondary justify-center items-center ">
        <Text  className="flex-1 text-white font-psemibold text-lg">
           {value} {unit}
        </Text>

      </View>
    </View>
  )
}

export default DataDisplay