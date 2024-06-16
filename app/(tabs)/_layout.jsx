import { View, Text, Image} from 'react-native'
import { Tabs, Redirect } from 'expo-router';
import { icons } from '../../constants';


const TabIcon = ({icon, color, name, focused}) =>{
    return (
        <View className="items-center justify-center gap-2">
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className= "w-5 h-5"
            />
            <Text className= {`${focused ? 'font-psemibold' :'font-pregular'}`}>
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
                tabBarShowLabel: false 
            }}
        >

            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({color, focused }) => (
                        <TabIcon
                            icon={icons.home}
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
                            icon={icons.eye}
                            color={color}
                            name="Home"
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
                            name="Home"
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
                            icon={icons.}
                            color={color}
                            name="Home"
                            focused={focused}
                        />
                    )
                }}            
            />  
        </Tabs>
    </>
  )
}

export default TabsLayout