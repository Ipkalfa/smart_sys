import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DataDisplay from '../../components/dataDisplay'

const Home = () => {
  return (
    <SafeAreaView>
      <View  >
        <Text>Home</Text>
        {/* <DataDisplay /> */}
      </View>
      <View>
        
      </View>
    </SafeAreaView>
  )
}

export default Home;