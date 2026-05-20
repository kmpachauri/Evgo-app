import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { colors } from '../../constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: {
          height: 72,
          borderTopWidth: 1,
          borderTopColor: '#E6E6E6',
          backgroundColor: '#FFFFFF',
          paddingTop: 7,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={29} color={color} />,
        }}
      />
      <Tabs.Screen
        name="equipment"
        options={{
          title: 'Product',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="view-grid" size={29} color={color} />,
        }}
      />
      <Tabs.Screen name="product" options={{ href: null }} />
      <Tabs.Screen
        name="team"
        options={{
          title: 'Team',
          tabBarIcon: ({ color }) => <FontAwesome5 name="sitemap" size={25} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'My',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={30} color={color} />,
        }}
      />
      <Tabs.Screen name="about" options={{ href: null }} />
      <Tabs.Screen name="sign" options={{ href: null }} />
      <Tabs.Screen name="lottery" options={{ href: null }} />
      <Tabs.Screen name="coupon" options={{ href: null }} />
      <Tabs.Screen name="myprofile" options={{ href: null }} />
      <Tabs.Screen name="logout" options={{ href: null }} />
      <Tabs.Screen name="recharge" options={{ href: null }} />
      <Tabs.Screen name="withdraw" options={{ href: null }} />
      <Tabs.Screen name="support" options={{ href: null }} />
      <Tabs.Screen name="payment" options={{ href: null }} />
      <Tabs.Screen name="payment-upi" options={{ href: null }} />
      <Tabs.Screen name="record" options={{ href: null }} />
      <Tabs.Screen name="income" options={{ href: null }} />
      <Tabs.Screen name="changepassword" options={{ href: null }} />
    </Tabs>
  );
}
