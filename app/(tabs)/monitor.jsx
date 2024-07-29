import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import PowerEnergyGraph from '../../components/graph'
import DataDisplay from '../../components/DataDisplays'

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
          <PowerEnergyGraph/>
        </View>
        <View className= "p-3 flex-row justify-evenly">
          <DataDisplay
           title={"Voltage"}
           value={122}
           unit={"V"}
          />
          <DataDisplay
           title={"Current"}
           value= {12}
           unit={"A"}
          />

        </View>
      </SafeAreaView>
    )
 
}

export default Monitoring