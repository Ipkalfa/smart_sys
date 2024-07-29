import { View, Text } from 'react-native'
import React, { useState } from 'react'



const NameField = ({title, value,}) => {
    
  return (
      <View className= " border-2  w-30% h-16 px-4 bg-black-200 rounded-2xl justify-center items-center flex-row space-x-4">
        <Text className="flex-1 text-white font-psemibold text-base mt-0.5 ">{title}</Text>

      </View>
  )
}

export default NameField