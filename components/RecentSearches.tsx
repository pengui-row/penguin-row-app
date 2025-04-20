import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

interface RecentSearchesProps {
  searches: string[];
  onRemoveSearch: (index: number) => void;
  onSearchPress: (searchText: string) => void; 
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ searches, onRemoveSearch, onSearchPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BÚSQUEDAS RECIENTES</Text>
      <View style={styles.searchList}>
        {searches.map((search, index) => (
          <SearchItem 
            key={index} 
            text={search} 
            onRemove={() => onRemoveSearch(index)}
            onTextPress={onSearchPress} 
          />
        ))}
      </View>
    </View>
  );
};

interface SearchItemProps {
  text: string;
  onRemove: () => void;
  onTextPress: (searchText: string) => void; 
}

const SearchItem: React.FC<SearchItemProps> = ({ text, onRemove, onTextPress }) => {
  return (
    <View style={styles.searchItem}>
      <TouchableOpacity onPress={() => onTextPress(text)}>
        <Text style={styles.searchText}>{text}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
        <AntDesign name="closecircleo" size={18} color="#888" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
    color: '#888',
    marginBottom: 16,
  },
  searchList: {
    flex: 1,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  searchText: {
    fontSize: 16,
    color: '#000',
  },
  removeButton: {
    padding: 4,
  },
});

export default RecentSearches;