import { useState } from 'react';
import { View, Text,TextInput,Button,StyleSheet } from 'react-native';


export default function AddScreen({navigation}) {

    const [title, setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [year,setYear] = useState("");
    const [author,setAuthor] = useState("");
    const [category,setCategory] = useState("");

     const clearForm   = ()=>{
        setTitle("");
        setAuthor("");
        setCategory("");
        setDescription("");
        setYear(0);
     }    
    const handleSubmit = async ()=>{
           const book = {
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
        body: JSON.stringify(book),
      });
      const data = await response.json();
      setBooks([...books, data]);
      clearForm();
    } catch (error) {
      console.error('Error adding book:', error);
    }

    }
    

    return (
        <View>
            <Text>AddScreen</Text>

            <Text>Titre du livre</Text>
            <TextInput 
            style={styles.textInput}
                value={title}  
                onChangeText={setTitle}
                placeholder="titre du livre"

            />

            <Text>Description </Text>
            <TextInput
            style={styles.textInput} 
            value={description}
            onChangeText={setDescription}
            multiline={true}
            placeholder="Description du livre" />

            <Text>Année de parution</Text>
            <TextInput 
            style={styles.textInput}
            value={year}
            onChangeText={setYear}
            placeholder="2024"
            keyboardType="numeric" />

            <Text>Auteur</Text>
            <TextInput 
            style={styles.textInput}
            value={author}
            onChangeText={setAuthor}
            placeholder="Maestrati François" />

            <Text>Category</Text>
            <TextInput 
            style={styles.textInput}
            value={category}
            onChangeText={setCategory}
            placeholder="Fantastique"
            />
            <Button  title="Ajouter le livre" onPress={handleSubmit} />

            
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
    height: 40,
    width: '80%',
    borderWidth: 1, // Largeur de la bordure
    borderColor: 'red', // Couleur de la bordure
    borderRadius: 5, // Rayon de la bordure (optionnel)
    paddingHorizontal: 10,}
})