import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';

 
export default function TabLayout() {
 

  return (
    <Tabs
      screenOptions={{
  
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="auto"
        options={{
          title: 'Auto y Cargo',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="car.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="anclajes"
        options={{
          title: 'Anclajes',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="wrench.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
