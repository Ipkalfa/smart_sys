import { View, Text, TextInput,Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { icons } from '../constants';
import { Ionicons } from '@expo/vector-icons';


const NameField = ({title, value,placeholder, handleChangeText,otherStyles, ...props }) => {
    const [showPassword, setshowPassword] = useState(false)
  return (
      <View className= " border-2  w-full h-16 px-4 bg-black-200 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
        <TextInput
            className="flex-1 text-white font-pregular text-base mt-0.5"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Password' && !showPassword}
        />
        <TouchableOpacity>
          <Ionicons name="pencil-sharp" size={24} color="white" />
        </TouchableOpacity>
      </View>
  )
}

export default NameField