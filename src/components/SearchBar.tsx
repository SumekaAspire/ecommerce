
import { View, Text, StyleSheet, TextInput, ActivityIndicator} from 'react-native'
import React, { useState , useMemo, useEffect} from 'react'
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from '../styles/colors';

//interface for SerachBar
interface SearchBarProps{
  
  onChangeText: (text: string) => void;
  label?: string;
  
}
/**
 * Displays SearchBar 
 * @param param0 onChange Text updates the text on the searchBar
 * @returns SearchBar componnet
 */
const SearchBar:React.FC<SearchBarProps> = ({onChangeText, label}) => {

   const [search, setSearch] = useState("");
   const handleChange =(text:string)=>{
    setSearch(text);
    onChangeText(text);
   }
  return (
    <View style={styles.container}>
      <View style= {styles.searchBar}>
      <Icon name="search" size={20} color={colors.black}/>

      <TextInput
         style={styles.input}
         onChangeText={handleChange}
         value={search}
         placeholder= {label}
      />

    </View>

    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container:{
        backgroundColor:"#dbd6d6ff",
        margin:10,
        borderWidth: 2,
        borderColor:colors.grey,
        borderRadius:5
  },
  input: {
    height: 35,
    width:"90%",
    // margin: 12,
    // borderWidth: 1,
    // padding: 10,
    // borderColor:colors.grey,
  },
  searchBar:{
    flexDirection:"row",
    alignItems:"center",
    margin:5

  }
})









// import { View, Text, StyleSheet, TextInput, ActivityIndicator} from 'react-native'
// import React, { useState , useMemo, useEffect} from 'react'
// import Icon from "react-native-vector-icons/MaterialIcons";


// interface SearchBarProps{
//   data: any[];
//   searchKey: string;
//   onSearch: (filteredProducts: any[]) => void;
  
// }
// const SearchBar:React.FC<SearchBarProps> = ({data, searchKey, onSearch}) => {

//    const [search, setSearch] = useState(" ");
   
//    //filter data based on search data
//    const filteredData = useMemo(() => {
//     return data.filter((item) =>
//     item[searchKey].toLowerCase().includes(search.toLowerCase())
//   )
//    },[data, searchKey,search]);

//   //update filtered data to parent whenever search changes
//    useEffect(() =>{
//     onSearch(filteredData);
//    },[filteredData, onSearch]);

//   return (
//     <View style={styles.container}>
//       <View style= {styles.searchBar}>
//       <Icon name="search" size={20} color="#888"/>

//       <TextInput
//          style={styles.input}
//          onChangeText={setSearch}
//          value={search}
//          placeholder= "Search..."
//       />

//     </View>

//     </View>
//   )
// }

// export default SearchBar

// const styles = StyleSheet.create({
//   container:{
//         backgroundColor:"white",
//         margin:10,
//         borderWidth: 1,
//         borderColor:"#888"
//   },
//   input: {
//     height: 35,
//     width:"90%",
//     // margin: 12,
//     // borderWidth: 1,
//     // padding: 10,
//     // borderColor:"#888"
//   },
//   searchBar:{
//     flexDirection:"row",
//     alignItems:"center",
//     margin:5

//   }
// })


