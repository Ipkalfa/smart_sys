import { View, Text, FlatList, Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/EmptyState'
import DeviceData from '../../components/DeviceData'
import UseAppwrite from '../../lib/UseAppwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import { searchMeasurements, getDevicedata } from '../../lib/appwrite'
import InfoBox from '../../components/InfoBox'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { icons } from '../../constants'




const Profile = () => {
const {user, setUser, setisLoggedIn} = useGlobalContext();
  const {data: deviceData} = UseAppwrite(() => getDevicedata(user.$id));

  const logout = () =>{

  }


  console.log(deviceData)

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={deviceData}
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
            <InfoBox
              title={measurements.length || 0}
              subtitle="Measurements"
              containerStyles='mr-10'
              titleStyles="text-xl"
            />  
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
            title="No Measurements Found."
            subtitle="No measurements found for this search query."
          />
        )}

      />
    </SafeAreaView>
  )
}

export default Profile