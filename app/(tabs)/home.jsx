import { View, Text, Image, ScrollView} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import NameField from '../../components/NameField'
import { Ionicons } from '@expo/vector-icons';


import DataDisplay from '../../components/dataDisplay'
import { images } from '../../constants'



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
          <Image
            source={images.witch}
            className="w-full h-full "
            resizeMode='contain'

          />
          <NameField />
        </View>
        <View className=" p-10 px-3  justify-between  ">
          <Image
            source={images.witch}
            className="w-full h-full"
            resizeMode='contain'
          />
          <NameField />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home