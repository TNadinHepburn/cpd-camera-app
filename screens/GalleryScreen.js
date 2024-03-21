import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import * as FileSystem from "expo-file-system";
import { useState, useEffect } from 'react';

const PHOTOS_DIR = FileSystem.documentDirectory;// + "CPD_Photos";

export default function GalleryScreen() {
  const [photo, setPhotos] = useState([])

  const Row = ({ dir, photos }) => {
    return(
      <View style={styles.row}>
      {photos.map((photo) => (
          <View style={styles.imageContainer} key={photo}>
            <Image source={{'uri': `${dir}/${photo}`}} style={styles.image} />
          </View>
        ))}
      </View>
    );
  } 

  const retrievePhotos = async () => { 
    try {
      const currPhotos = await FileSystem.readDirectoryAsync(PHOTOS_DIR); 
      setPhotos(currPhotos)
    } catch (error) {
      console.log('Error retrieving photos');
    }
  };

  useEffect(() => {
    retrievePhotos();
  })

  const gallery = [];
  const rowWidth = 3;
  for (let i = 0; i < (photo.length / rowWidth) + 1; i++) {
    gallery.push(<Row photos={photo.slice(i*rowWidth, i*rowWidth+rowWidth)} key={i}></Row>)
  }

  return (
    <View style={styles.container}>
     <ScrollView contentContainerStyle={{flexGrow: 1}}>
       {gallery}
     </ScrollView>
    </View>
  );
}

 const styles = StyleSheet.create({
   container: {
     height: '100%'
   },
   row: {
     flexDirection: 'row', 
     flex: 1
   },
   imageContainer: {
     width: '33%'
   },
   image: {
     height: 170
   }
 });