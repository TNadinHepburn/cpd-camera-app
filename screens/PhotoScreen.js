import {Image, View, StyleSheet, Button} from 'react-native'
import * as MediaLibrary from 'expo-media-library';

export default function PhotoScreen(props) {
    
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const onSave = async () => {
        if (status.granted == true) {
          await MediaLibrary.createAssetAsync(props.route.params.uri);
          alert('Picture Added to Camera Roll')
        }
        else {
          await requestPermission();
          if (status.granted != true) {
            alert('Camera Roll Permission Denied')
          }
        }
      }

    return (
        <View style={{flex : 1}}>
            <Image source={{'uri': props.route.params.uri}} style={{flex: 1}}/>
            <Button title="Save to Camera Roll" onPress={onSave}/>
        </View>
    );
}