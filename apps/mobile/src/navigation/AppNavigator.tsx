// ─────────────────────────────────────────────────────────────────────────────
//  apps/mobile/src/navigation/AppNavigator.tsx
//  Root navigation — Bottom Tab Navigator
//  Mirrors the web app's 5-item bottom nav
// ─────────────────────────────────────────────────────────────────────────────
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { View, Text, Platform, StyleSheet } from 'react-native'
import { colors } from '@social-strategy/theme/tokens'

import { DashboardScreen }    from '../screens/DashboardScreen'
import { AnalysisScreen }     from '../screens/AnalysisScreen'
import { ContentStudioScreen } from '../screens/ContentStudioScreen'

// Placeholder screens (to be built out)
function CharactersScreen() {
  return <View style={styles.placeholder}><Text style={styles.phText}>🤖 AI Characters</Text></View>
}
function ProfileScreen() {
  return <View style={styles.placeholder}><Text style={styles.phText}>👤 Profile</Text></View>
}

const Tab = createBottomTabNavigator()

const tabIcons: Record<string, string> = {
  Dashboard:  '🏠',
  Analysis:   '🔍',
  Studio:     '✍️',
  Characters: '🤖',
  Profile:    '👤',
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'rgba(5,8,22,0.96)',
            borderTopColor: 'rgba(32,217,255,0.12)',
            borderTopWidth: 1.5,
            height: Platform.OS === 'ios' ? 88 : 64,
            paddingBottom: Platform.OS === 'ios' ? 24 : 8,
            paddingTop: 8,
          },
          tabBarActiveTintColor: colors.cyan,
          tabBarInactiveTintColor: colors.textDim,
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '800',
            letterSpacing: 0.3,
          },
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.6 }}>
              {tabIcons[route.name] ?? '•'}
            </Text>
          ),
        })}
      >
        <Tab.Screen name="Dashboard"  component={DashboardScreen}     options={{ title: 'Home'     }} />
        <Tab.Screen name="Analysis"   component={AnalysisScreen}      options={{ title: 'Analyse'  }} />
        <Tab.Screen name="Studio"     component={ContentStudioScreen} options={{ title: 'Create'   }} />
        <Tab.Screen name="Characters" component={CharactersScreen}    options={{ title: 'AI Team'  }} />
        <Tab.Screen name="Profile"    component={ProfileScreen}       options={{ title: 'Profile'  }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.bg0,
  },
  phText: { fontSize: 24, color: colors.textPrimary, fontWeight: '800' },
})
