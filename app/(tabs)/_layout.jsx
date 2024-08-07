import { View, Text, Image} from 'react-native'
import { Tabs, Redirect } from 'expo-router';
import { icons } from '../../constants';
import { StatusBar } from 'expo-status-bar'
import { Entypo } from '@expo/vector-icons';


const TabIcon = ({icon, color, name, focused}) =>{
    return (
        <View className="items-center justify-center gap-2">
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className= "w-5 h-5"
            />
            <Text className= {`${focused ? 'font-psemibold' :'font-pregular'} text-xs`} style={{color: color}}>
                {name}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
  return (
    <>
        <Tabs
            screenOptions={{
                tabBarShowLabel: false, 
                tabBarActiveTintColor: '#FFA001',
                tabBarInactiveTintColor: '#CDCDE0',
                tabBarStyle: {
                    backgroundColor:'#161622',
                    borderTopWidth: 1,
                    borderTopColor: '#232533',
                    height: 84,
                }
            }}
        >

            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({color, focused }) => (
                        <TabIcon
                            icon={icons.homee}
                            color={color}
                            name="Home"
                            focused={focused}
                        />
                    )
                }}            
            /> 
            <Tabs.Screen
                name="monitor"
                options={{
                    title: 'Monitor',
                    headerShown: false,
                    tabBarIcon: ({color, focused }) => (
                        <TabIcon
                            icon={icons.mon}
                            color={color}
                            name="Monitor"
                            focused={focused}
                        />
                    )
                }}            
            />   
            <Tabs.Screen
                name="recents"
                options={{
                    title: 'Recents',
                    headerShown: false,
                    tabBarIcon: ({color, focused }) => (
                        <TabIcon
                            icon={icons.recentss}
                            color={color}
                            name="Recents"
                            focused={focused}
                        />
                    )
                }}            
            />   

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({color, focused }) => (
                        <TabIcon
                            icon={icons.profile}
                            color={color}
                            name="Profile"
                            focused={focused}
                        />
                    )
                }}            
            />  
 
        </Tabs>
        <StatusBar backgroundColor="#161622" style='light'/>
    </>
  )
}

export default TabsLayout