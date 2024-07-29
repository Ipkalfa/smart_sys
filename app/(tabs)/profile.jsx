import { View, Text, FlatList, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/EmptyState'
import DeviceData from '../../components/DeviceData'
import UseAppwrite from '../../lib/UseAppwrite'
import { useGlobalContext, measurement } from '../../context/GlobalProvider'
import { searchMeasurements, getDevicedata, signOut } from '../../lib/appwrite'
import InfoBox from '../../components/InfoBox'
import { icons } from '../../constants'
import MeasuredValues from '../../components/MeasuredValues'

import { router } from 'expo-router'


const Profile = () => {
const {user, measurement, setUser, setisLoggedIn} = useGlobalContext();
  const {data: DeviceData, measurements} = UseAppwrite(() => 
    getDevicedata(user.$id),
    // MeasuredValues(measurement.id)
  );

  const logout = async () =>{
    await signOut();
    setUser(null)
    setisLoggedIn(false)

    router.replace('/sign_in')
  }


  console.log(DeviceData)

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={DeviceData}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <DeviceData value= {item} />
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4 ">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
             <Image source= {icons.logout}
              resizeMode="contan" 
              className="w-6 h-6"
             />  
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg "
                resizeMode='cover'
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles='mt-5'
              titleStyles="text-lg"
            />

          <View className="mt-5 flex-row">
            {/* <InfoBox
              title={measurements.length || 0}
              subtitle="Measurements"
              containerStyles='mr-10'
              titleStyles="text-xl"
            />   */}
            <InfoBox
              title=""
              subtitle="Devices connected"
              titleStyles="text-xl"
            />          
          </View>


          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No DevicesFound."

          />
        )}

      />
    </SafeAreaView>
  )
}

export default Profile