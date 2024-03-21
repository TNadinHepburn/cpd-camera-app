import {Text, View, StyleSheet, Button} from 'react-native'
import { useState, useEffect, useRef } from 'react';
import { Camera, CameraType } from "expo-camera";
import * as FileSystem from "expo-file-system"; 
import { useIsFocused } from '@react-navigation/native';

const PHOTOS_DIR = FileSystem.documentDirectory;// + "CPD_Photos";


export default function CameraScreen(props) {
  const cameraRef = useRef({});
  const [status , requestPermission] = Camera.useCameraPermissions();
  const isFocused = useIsFocused();

  const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(PHOTOS_DIR);
 
    if (!dirInfo.exists) {
      console.log("Photos directory doesn't exist, creating...");
      await FileSystem.makeDirectoryAsync(PHOTOS_DIR);
    }
    else{
      console.log("Photos directory does exist");

    }
  };

  const takePicture = async () => {
    try{
      saveURI = `${PHOTOS_DIR}/cpd_${Date.now()}.jpg`
      photoObj = await cameraRef.current.takePictureAsync();
      result = await FileSystem.moveAsync({from: photoObj.uri, to: saveURI});
      props.navigation.navigate("Photo", {uri: saveURI})
    }
    catch (e) {
      console.log(e)
    }
  };

  const requestCameraPermissions = async () => {
    if (status == null) {
      await requestPermission();
      useEffect(() => {
        requestCameraPermissions();
        ensureDirExists();
      })
    }
    else if (status.granted == false) {
      alert('Camera permissions denied');
    }
  }

  if (isFocused) {
    return (
    <View style={{flex : 1}}>
       <Camera ratio="16:9" style={{flex : 1}} ref={cameraRef}/>
       <Button title="Capture Photo" onPress={takePicture}/>
    </View>
    );  
  }
  else {
    return <View/>
  }
  // return (
  // <View style={{flex : 1}}>
  //   <Camera ratio="16:9" style={{flex : 1}} type={CameraType.back}/>
  // </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});