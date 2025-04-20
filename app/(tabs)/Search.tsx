import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native';
import SearchBar from '../../components/SearchBar';
import RecentSearches from '../../components/RecentSearches';
import PostCard from '@/components/PostCard';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    'Programación',
    'Medicina',
    'Salsa Casino',
  ]);
  const [searched, setSearched] = useState<boolean>(false);
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleRemoveSearch = (index: number) => {
    const updatedSearches = [...recentSearches];
    updatedSearches.splice(index, 1);
    setRecentSearches(updatedSearches);
  };
  const handleSubmit = () => {
    setSearched(true);
  };

  const handleFocus = () => {
    setSearched(false);
  };

  const handleSearchPress = (searchText: string) => {
    setSearchQuery(searchText.replace(" ", ""));
    setSearched(true);
  };
  const SearchedPost = () => {
    const result = [
      {
          id: "1",
          avatar: require("../../assets/images/avatars/avatar1.png"),
          name: "Martha Craig",
          handle: "@craig_love",
          time: "12h",
          content:
              `UX/UI/UX: You can only bring one item to a remote island to assist your research of native use of tools and usability. What do you bring? #${searchQuery}`,
          comments: "28",
          reposts: "28",
          likes: "28",
          hasImage: true,
      },
  ]
    return (
      <View>
        {
          result.map((post) => (
            <PostCard key={post.id} post={post}/>
          ))
        }
      </View>
    )
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <SearchBar value={searchQuery} onChangeText={handleSearch} onSubmit={handleSubmit} onFocus={handleFocus}/>
        {!searched && <RecentSearches 
          searches={recentSearches} 
          onRemoveSearch={handleRemoveSearch}
          onSearchPress={handleSearchPress}
        />
        }
        {
          searched && <SearchedPost/>
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});