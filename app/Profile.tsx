import { Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import TagProfile from '@/components/TagProfile'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import ProfileInfo from '@/components/ProfileInfo';
import ProfileDescription from '@/components/ProfileDescription';
import NavTabs from '@/components/NavTabs';
import UserPosts from '@/components/UserPosts';
import FavoritePosts from '@/components/FavoritePosts';
  
const Profile = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const { width: screenWidth } = Dimensions.get('window');
    const components = [UserPosts, FavoritePosts, ProfileDescription];
    const handleIndexChange = (index: number) => {
        setSelectedIndex(index);
        scrollViewRef.current?.scrollTo({ x: index * screenWidth, y: 0, animated: true });
    };
    const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffset = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(contentOffset / screenWidth);
        setSelectedIndex(newIndex);
    };
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.headerContainer}>
        <Text style={{fontWeight:"bold", marginRight:"28%"}}>Perfil</Text>
        <FontAwesome.Button 
        name='gear'
        style={styles.configStyle}
        color={"#1E3A5F"}
        backgroundColor={"transparent"}
        onPress={()=>{console.log("hola")}}
        />
      </View>
      <ProfileInfo/>
      <FlatList
      horizontal
      data={[{name:"Publicaciones"},{name:"Favoritos"},{name:"Información"}]}
      bounces={false}
      initialNumToRender={3}
      style={styles.flatListStyle}
      contentContainerStyle={styles.contentContainerStyle}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={()=> 
        (<View style={styles.itemSeparatorComponentStyle}/>)
      }
      renderItem={({item, index}) => <TagProfile 
      selected={index === selectedIndex}
      onPress={()=>{handleIndexChange(index)}}
      name={item.name}
      />}
      >
      </FlatList>
      <ScrollView
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={handleScrollEnd}
      scrollEventThrottle={16}
      contentContainerStyle={{ width: components.length * screenWidth }}
      >
        {components.map((Component, index) => (
          <View key={index} style={{ width: screenWidth }}>
            <Component />
          </View>
        ))}
      </ScrollView>
      <NavTabs/>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
    flatListStyle: {
        flexGrow:0,
    },
    contentContainerStyle: {
        paddingHorizontal:10,
        marginBottom:15,
    },
    itemSeparatorComponentStyle: {
        marginRight:10
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    configStyle: {
        paddingLeft: 20,
    },
    component: {
        justifyContent: 'center',
        alignItems: 'center',
      },
})