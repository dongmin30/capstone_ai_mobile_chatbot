import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Welcome, Login, Register, Home, Chat, UserChat, Schedule } from '../screens'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigation from './BottomTabNavigation'

const Stack = createNativeStackNavigator()

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Welcome"
                    component={Welcome}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="BottomTabNavigation"
                    component={BottomTabNavigation}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Chat"
                    component={Chat}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="UserChat"
                    component={UserChat}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Schedule"
                    component={Schedule}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation
