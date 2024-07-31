import { View, Text } from 'react-native'
import React, { useState } from 'react'



const NameField = ({title, value,}) => {
    
  return (
    <View className="items-center">
      <View className= "  border-2  w-[200] h-16 px-6 bg-black-200 rounded-2xl border-secondary-100 items-center justify-center space-x-4">
        <Text className=" text-white font-psemibold text-base ">{title}</Text>
      </View>
    </View>  
  )
}

export default NameField