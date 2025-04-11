import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import SearchBar from '../../components/SearchBar';
import RecentSearches from '../../components/RecentSearches';
import NavTabs from '@/components/NavTabs';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    'Programación',
    'Medicina',
    'Salsa Casino',
  ]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleRemoveSearch = (index: number) => {
    const updatedSearches = [...recentSearches];
    updatedSearches.splice(index, 1);
    setRecentSearches(updatedSearches);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <SearchBar value={searchQuery} onChangeText={handleSearch} />
        <RecentSearches 
          searches={recentSearches} 
          onRemoveSearch={handleRemoveSearch} 
        />
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