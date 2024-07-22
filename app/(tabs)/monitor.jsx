import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'

const Monitoring = () => {
  
    return (
      <SafeAreaView className= "bg-primary flex-1">
        <View  className="px-3 flex-row justify-between">
          <View>
            <Text className="text-white text-2xl font-psemibold">Monitoring your HomeSys</Text>
          </View>
          <View>
            <Image
              source={images.logoh}
              className="w-9 h-10"
              resizeMode='contain'
            />
          </View>
        </View>
        <View className= "p-3">
          <Text className="text-white text-4xl font-bold">Monitoring</Text>

        </View>
      </SafeAreaView>
    )
 
}

export default Monitoring