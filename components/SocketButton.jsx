import {TouchableOpacity, Image, Text} from 'react-native'
import React from 'react'
import { images } from '../constants'

const SocketButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity 
     onPress={handlePress}
     activeOpacity={0.7} // opacity of button once pressed
     className={`bg-secondary rounded-xl  justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
     disabled={isLoading} >
  
    <Image
        source={images.witch}
        className="w-full h-full "
        resizeMode='contain'

    />
    </TouchableOpacity>
  )
}

export default SocketButton