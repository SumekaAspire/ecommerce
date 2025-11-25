import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {  View, Text,  Modal, StyleSheet, TextInput, TouchableOpacity,FlatList, ActivityIndicator, Keyboard,} from 'react-native';
import { colors } from '../styles/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinkHandler from './LinkHandler';
import { fetchproducts } from '../services/api';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const Search = ({ label }: { label: string }) => {
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [modalOpenPreviously, setModalOpenPreviously] = useState(false); //used to reopen the modal when returning from another screen
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation: any = useNavigation();

  //Load all products once for suggestions
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchproducts();
        setProducts(data);
      } catch (err) {
        console.log('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

 //Reopen modal when returning from ProductList(another screen). Regain focus on Homescreen from ProductList, run only it is active .First serch componnet in home screen, after opens also still in the same screen, then navigates to productlist screen(homescreen is not active).
 //After back navigates from productList  to HomeScreen, useFocusEffect will run.
useFocusEffect(
    //ensures the function reference is stable and doesn’t cause re-renders.
    useCallback(() => {
      // Reopen the modal only if it was previously open
      if (modalOpenPreviously) {
        setSearchModalVisible(true);
      }
    }, [modalOpenPreviously])
  );

  //handle Back navigation when modal is open
const handleBack = () => {
      setSearchText('');
      setSearchModalVisible(false);
      setModalOpenPreviously(false);// reset modal state
  };

  const handleClearSearch = () => {
    setSearchText('');
  };

  // Filter suggestions
  const filteredSuggestions = useMemo(() => {
    const searchQuery = searchText.trim().toLowerCase();
    if (!searchQuery) return [];
    const matches = products.filter((item) =>
      item.title.toLowerCase().includes(searchQuery)
    );
    return matches.length > 0 ? matches.slice(0, 5) : [];
  }, [searchText, products]);

  //Handle search submit or Done/Enter
  const handleSubmitSearch = () => {
    const trimmed = searchText.trim();
    if (trimmed.length === 0) return;
    Keyboard.dismiss();
    setSearchModalVisible(false);
    setModalOpenPreviously(true);
    navigation.navigate('ProductList', { searchProducts: trimmed });
  };

  //Handle suggestion press
  const handleSuggestionPress = (title: string) => {
    setSearchText(title);
    Keyboard.dismiss();
    setSearchModalVisible(false);
    setModalOpenPreviously(true); //mark modal as previously open
    navigation.navigate('ProductList', { searchProducts: title });
  };

  return (
    <View>
      {/* Search Bar */}
      <TouchableOpacity onPress={() => {
        setSearchModalVisible(true);
        setModalOpenPreviously(true) //mark modal as open
      }}>
        <View style={styles.container}>
          <View style={styles.searchBar}>
            <Icon name="search" size={20} color={colors.black} />
            <Text style={styles.placeholder}>Search...</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={searchModalVisible}
        animationType="fade"
        transparent={false}
        onRequestClose={() => setSearchModalVisible(false)}> 
        {/* ONrequestClose - handles Android back press*/}
        <View style={styles.outerContainer}>
          {/* Back Icon */}
          <LinkHandler
            onPress={handleBack}
            iconComponent={
              <Ionicons name="arrow-back-outline" size={26} color={colors.black} />
            }
          />

          {/* Input */}
          <View style={styles.container}>
            <View style={styles.searchBar}>
              <Icon name="search" size={20} color={colors.black} />
              <TextInput
                style={styles.input}
                placeholder={label}
                value={searchText}
                autoFocus
                returnKeyType="search"
                onSubmitEditing={handleSubmitSearch}
                onChangeText={(text) => {
                  if (text.startsWith(' ')) return;// If user type a space as the first character, ignore it — don’t update the input state.
                  setSearchText(text);
                }}
              />
              {searchText.length > 0 && (
                <LinkHandler
                  onPress={handleClearSearch}
                  iconComponent={
                    <Ionicons name="close-outline" size={24} color={colors.black} />
                  }
                  viewStyle={{ right: 10 }}
                />
              )}
            </View>
          </View>

          {/* Suggestions */}
          {searchText.length > 0 && (
            <View style={styles.suggestionWrapper}>
              <Text style={styles.suggestionHeading}>Suggested Products</Text>

              {loading ? (
                <ActivityIndicator size="small" color={colors.ORANGE_COLOR} />
              ) : filteredSuggestions.length > 0 ? (
                <FlatList
                  data={filteredSuggestions}
                  keyExtractor={(item) => item.id.toString()}
                  keyboardShouldPersistTaps="handled"
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => handleSuggestionPress(item.title)}
                      style={styles.suggestionItem}>
                      <Text style={styles.suggestionText}>{item.title}</Text>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <Text style={styles.noResults}>No products found...</Text>
              )}
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dbd6d6ff',
    margin: 10,
    borderRadius: 5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  placeholder: {
    color: colors.black,
    marginLeft: 5,
  },
  input: {
    height: 35,
    width: '90%',
    marginLeft: 5,
  },
  outerContainer: {
    marginTop: 20,
    flex: 1,
  },
  suggestionWrapper: {
    marginHorizontal: 12,
    backgroundColor: colors.suggestionconatianer,
    borderRadius: 5,
    elevation: 3,
    maxHeight: 300,
    padding: 5,
  },
  suggestionHeading: {
    fontSize: 15,
    color: colors.black,
    fontFamily: 'Figtree-Bold',
    marginVertical: 10,
    marginLeft: 5,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: colors.grey,
  },
  suggestionText: {
    fontSize: 15,
    color: colors.black,
  },
  noResults: {
    padding: 15,
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
});
