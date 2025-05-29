import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import NavTabs from '@/components/NavTabs'

const _layout = () => {
  return (
    <Tabs
    tabBar={props => <NavTabs {...props}/>}
    screenOptions={{
        headerShown: false
      }}
    >
      <Tabs.Screen
      name='index'
      />
      <Tabs.Screen
      name='Search'
      />
      <Tabs.Screen
      name='CreatePost'
      />
      <Tabs.Screen
      name='Notifications'
      />
      <Tabs.Screen
      name='Profile'
      />
    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})