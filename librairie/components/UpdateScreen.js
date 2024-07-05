import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function ListScreen({ navigation }) {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [year, setYear] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    
    useEffect(() => {
        fetchBooks();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchBooks();
        }, [])
    );

    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:7000/api/books');
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const clearForm   = ()=>{
        setTitle("");
        setAuthor("");
        setCategory("");
        setDescription("");
        setYear(0);
     }    

    const ModifBook = async ()=>{
           const newbook = {
            title:title,
            description:description,
            year:year,
            author:author,
            category:category
           }
           
    try {
      const response = await fetch('http://localhost:7000/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newbook),
      });
      const data = await response.json();
      const ModifBooks = books.map(book => (book.id === item.id ? data : book));
      setBooks(ModifBooks);
      clearForm();
    } catch (error) {
      console.error('Error adding book:', error);
    }

    }

    const item_book = ({ item }) => {

        return(
            <View style={styles.itemContainer}>
            <TextInput style={styles.title} value={title} onChangeText={setTitle} />
            <TextInput value={description} onChangeText={setDescription} />
            <TextInput value={year} onChangeText={setYear} />
            <TextInput value={author} onChangeText={setAuthor} />
            <TextInput value={category} onChangeText={setCategory} />
            <Button title="Modifier le libre" onPress={() => ModifBook(item)} />
        </View>
        )

    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>List of Books</Text>
            <FlatList
                keyExtractor={(item) => item.id.toString()}
                data={books}
                renderItem={item_book}
                ListEmptyComponent={<Text>No books available.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        marginBottom: 16,
    },
    itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});