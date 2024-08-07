// home screen maybe ?? g
import { Text, View, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';


export default function App() {
  const {isLoading,isLoggedIn } = useGlobalContext();

  if(!isLoading && isLoggedIn) return <Redirect href="/home"/>
  return (
    <SafeAreaView className= "bg-primary h-full">
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logoh}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.wing}
            className="max-w-[380px] h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Use Right, Pay Right with {' '}
              <Text className="text-secondary-200">HomeSys</Text>
            </Text>
            <Image
            source={images.path}
            className="w-[342px] h-[15px] absolute -bottom-2 -left-0"
            resizeMode="contain"
          />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">Where creativity meets innovation</Text>
          
          <CustomButton 
            title= "Continue with Email"
            handlePress= { ()=> router.push('/sign_in')}
            containerStyles= "w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar  backgroundColor='#161622' style='light'/> 
    
    </SafeAreaView>
   
  );
}



