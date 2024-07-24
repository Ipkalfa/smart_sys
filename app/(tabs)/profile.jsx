import { View, Text, FlatList} from 'react-native'
import React, { useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import DeviceData from '../../components/DeviceData'
import UseAppwrite from '../../lib/UseAppwrite'
import { useLocalSearchParams } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'
import { getDevicedata } from '../../lib/appwrite'



const Profile = () => {
const {user, setUser, setisLoggedIn} = useGlobalContext();
  const {data: deviceData} = UseAppwrite( () => getDevicedata(device.$id));

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={deviceData}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <DeviceData value= {item} />
        )}
        ListHeaderComponent={() => (
          <View className= "my-6 px-4 "> 
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold text-white">
              {/* {query} */}
            </Text>
            <View className="mt-6 mb-8 ">
              {/* <SearchInput initialQuery={query}/> */}
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