import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Feather } from '@expo/vector-icons';

interface RecentSearchesProps {
  searches: string[];
  onRemoveSearch: (index: number) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ searches, onRemoveSearch }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BÚSQUEDAS RECIENTES</Text>
      <View style={styles.searchList}>
        {searches.map((search, index) => (
          <SearchItem 
            key={index} 
            text={search} 
            onRemove={() => onRemoveSearch(index)} 
          />
        ))}
      </View>
    </View>
  );
};

interface SearchItemProps {
  text: string;
  onRemove: () => void;
}

const SearchItem: React.FC<SearchItemProps> = ({ text, onRemove }) => {
  return (
    <View style={styles.searchItem}>
      <Text style={styles.searchText}>{text}</Text>
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