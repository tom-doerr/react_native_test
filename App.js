import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import logo from './assets/logo.png';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import * as SplashScreen from 'expo-splash-screen';
import { Button } from "@react-native-material/core";

//SplashScreen.preventAutoHideAsync();
//setTimeout(SplashScreen.hideAsync, 5000);

export default function App() {
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [encodingResponse, setEncodingResponse] = React.useState(null);

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
            return;
        }

        setSelectedImage({ localUri: pickerResult.uri });   
    };

    let encode = async () => {
        //curl \
//-X POST https://demo-cas.jina.ai:8443/post \
//-H 'Content-Type: application/json' \
//-d '{"data":[{"text": "First do it"}],
    //"execEndpoint":"/"}'

 //LOG  {"data": [{"adjacency": null, "blob": null, "chunks": null, "embedding": [Array], "evaluations": null, "granularity": null, "id": "b2c65adedc95445a5552304d40c18501", "location": null, "matches": null, "mime_type": "text/plain", "modality": null, "offset": null, "parent_id": null, "scores": null, "tags": null, "tensor": null, "text": "First do it", "uri": null, "weight": null}], "header": {"execEndpoint": "/", "requestId": "945d834ca2cd47dabfa29cefc5cc8ba3", "status": null, "targetExecutor": ""}, "parameters": {}, "routes": [{"endTime": "2022-09-11T04:04:11.670701+00:00", "executor": "gateway", "startTime": "2022-09-11T04:04:11.655865+00:00", "status": null}, {"endTime": "2022-09-11T04:04:11.670539+00:00", "executor": "clip_t", "startTime": "2022-09-11T04:04:11.656030+00:00", "status": null}]}

        let response = await fetch(`https://demo-cas.jina.ai:8443/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "data": [{ "text": "First do it" }],
                "execEndpoint": "/"
            })
        });
        setEncodingResponse(response);
        console.log(response);
        // get the embedding
        let responseJson = await response.json();
        console.log(responseJson);
        let embedding = responseJson.data[0].embedding;
        console.log(embedding);



        //let xhr = new XMLHttpRequest();
        //xhr.open("POST", "https://demo-cas.jina.ai:8443/post", true);
        //xhr.setRequestHeader('Content-Type', 'application/json');
        //xhr.onreadystatechange = function () {
            //if (xhr.readyState === 4 && xhr.status === 200) {
                //var json = JSON.parse(xhr.responseText);
                //console.log(json);
            //}
        //}
        //xhr.send(JSON.stringify({
            //"data": [{ "text": "First do it" }],
            //"execEndpoint": "/"
        //}));
    //let embedding = JSON.parse(xhr.responseText).data[0].embedding;
    //console.log(embedding);

    };

    //function DisplayResponse() {
        //if (encodingResponse) {
            //return (
                //<Text style={styles.responseText}>
                    //true
                    ////{encodingResponse}
                //</Text>
            //);
        //}
        //return null;
    //}

    function ImageSelection() {
        return(    <View >
      <Text style={styles.instructions}>
      To share a photo from your phone with a friend, just press the button below!</Text>
      <StatusBar style="auto" />

      <TouchableOpacity
        onPress={openImagePickerAsync}
        style={styles.button}>
      <Text style={styles.buttonText}>Pick a photo</Text>
        </TouchableOpacity>

    </View>
  );

    }

    if (selectedImage !== null) {
        return (
            <View style={styles.container}>
            {
                //<DisplayResponse />
                }
                <Image
                    source={{ uri: selectedImage.localUri }}
                    style={styles.thumbnail}
                />
                <TouchableOpacity onPress={encode} style={styles.button}>
                    <Text style={styles.buttonText}>Encode</Text>
                </TouchableOpacity>
                <Button
                    onPress={encode}
                    title="Encode"
            />

            <ImageSelection />
            </View>
        );
    }

  return (
      <ImageSelection />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
    },
    instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    },
    button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
    marginTop: 10,
    },
    buttonText: {
    fontSize: 20,
    color: '#fff',
    },
    thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
    },
});
