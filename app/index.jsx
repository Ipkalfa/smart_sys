// home screen maybe ?? g
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className= "text-2xl">Smart Unit!</Text>
      <StatusBar style= "auto"/>
      <Link href="/profile" style={{color: 'blue'}}>Go to Profile</Link>
    </View>
   
  );
}



