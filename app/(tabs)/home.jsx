import { View, Text, Image, ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NameField from '../../components/NameField'
import { images } from '../../constants'
import {  } from 'react-native-gesture-handler'
import SwitchButton from '../../components/SwitchButton'
import SocketButton from '../../components/SocketButton'


const Home = () => {
  return (
    <SafeAreaView className="bg-primary flex-1">
      <View  className="px-3 flex-row justify-between">
        <View>
          <Text className="text-gray-100 font-pmedium text-sm">Welcome to</Text>
          <Text className="text-white text-2xl font-psemibold">HomeSys</Text>
        </View>
        <View>
          <Image
            source={images.logoh}
            className="w-9 h-10"
            resizeMode='contain'
          />
        </View>
      </View>
    <ScrollView className="min-h-[83vh]">
      
        <View className=" p-10 px-3 justify-between ">
          <SocketButton/>
          <NameField 
            title={"Smart Socket"}
          />
        </View>
        <View className=" p-10 px-3  justify-between  ">
          <SwitchButton/>
          
          <NameField 
            title={"Smart Switch"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home