import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function ListScreen({ navigation }) {
    const [books, setBooks] = useState([]);
    
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

    const item_book = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>{item.year}</Text>
            <Text>{item.author}</Text>
            <Text>{item.category}</Text>
        </View>
    );

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
