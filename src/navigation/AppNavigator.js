import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import FriendsScreen from '../screens/FriendsScreen';
import ReflectionsScreen from '../screens/ReflectionsScreen';
import PlanetaryPathScreen from '../screens/PlanetaryPathScreen';
import CardLadyScreen from '../screens/CardLadyScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Today':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Friends':
                iconName = focused ? 'people' : 'people-outline';
                break;
              case 'Reflections':
                iconName = focused ? 'journal' : 'journal-outline';
                break;
              case 'Planetary Path':
                iconName = focused ? 'planet' : 'planet-outline';
                break;
              case 'Card Lady':
                iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6366f1',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Today" component={HomeScreen} />
        <Tab.Screen name="Friends" component={FriendsScreen} />
        <Tab.Screen name="Reflections" component={ReflectionsScreen} />
        <Tab.Screen name="Planetary Path" component={PlanetaryPathScreen} />
        <Tab.Screen name="Card Lady" component={CardLadyScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
