import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import NavTabs from '@/components/NavTabs'

const _layout = () => {
  return (
    <Tabs
    tabBar={props => <NavTabs navigation={props.navigation} state={props.state} descriptors={props.descriptors} insets={props.insets}/>}
    screenOptions={{
        headerShown: false
      }}
    >
        
    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})