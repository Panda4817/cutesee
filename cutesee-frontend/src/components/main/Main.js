import React from 'react';
import axios from 'axios';
//import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';
import SearchBar from '../searchBar/SearchBar';
import Suggestions from '../suggestions/Suggestions';
import ImageList from '../imageList/ImageList';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import '@tensorflow/tfjs-core';
// Register WebGL backend.
import '@tensorflow/tfjs-backend-webgl';
import '@mediapipe/face_mesh';

/*const server = axios.create({
    baseURL: '/api',
    headers: { 'Cache-Control': 'no-cache' },
	adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter), {threshold: 86400000})
});*/


class Main extends React.Component {
    state = { 
        images: [],
        noHits: false
    };
    model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
    detectorConfig = {
        runtime: 'tfjs',
    };

    detectFaces = async (imgObj) => {
        const image = new Image(imgObj.webformatWidth, imgObj.webformatHeight);
        image.src = imgObj.webformatURL;
        image.crossOrigin = 'anonymous';
        const detector = await faceLandmarksDetection.createDetector(this.model, this.detectorConfig);
        const faces = await detector.estimateFaces(image);
        detector.dispose()
        if (faces.length > 0) {
            return true;
        }
        return false;
    }


	onSearchSubmit = async (term) => {
        const cachedHits = localStorage.getItem(term);
        const now = new Date();
        const dateKey = `${term} date`;
        const lastStored = localStorage.getItem(dateKey);
        let diff = 1;
        if (lastStored !== null) {
            console.log(lastStored)
            var obj = JSON.parse(lastStored);
            var oldDate = new Date(obj['date']);
            diff = (now.getTime() - oldDate.getTime())/(86400000);
            console.log(diff);
        }
        if (cachedHits && diff < 1) {
            this.setState({ images: JSON.parse(cachedHits) });
            this.setState({noHits: false});
        } else {
            if (cachedHits) {
                localStorage.removeItem(term);
                localStorage.removeItem(dateKey);
            }
            try {
                const response = await axios.get(`/api/${term}`);
                console.log(response);
                let count = 0;
                if (response.data.hits.length > 0) {
                    let filteredImages = [];
                    for (let imgObj of response.data.hits) {
                        const filterOut = await this.detectFaces(imgObj);
                        if (!filterOut) {
                            filteredImages.push(imgObj)
                            localStorage.setItem(term, JSON.stringify(filteredImages));
                            localStorage.setItem(dateKey, JSON.stringify({'date': new Date()}));
                            this.setState({ images: filteredImages});
                            count += 1;
                        }
                        // Limit to max 50 pictures as detecting faces through tensorflow.js is slow
                        if (count === 50) {
                            break;
                        }
                    }
                    console.log(filteredImages)
                } else {
                    this.setState({ images: []});
                    this.setState({noHits: true}); 
                }
            }catch (error) {
                console.log(error);
            }    
        }
            
        /*try {
            const response = await server.get(`/api/${term}`)
            console.log(response);
            this.setState({ images: response.data.hits});
        }catch (error) {
            console.log(error);
        }*/    
    }
	render() {
		return (
			<div id="main" className="container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <SearchBar userSubmit={this.onSearchSubmit} />
                    </div>
                </div>
                <div className="row justify-content-center m-3">
                    <div className="col-12">
                        <Suggestions userSubmit={this.onSearchSubmit} />
                    </div> 
                </div>
                <div className="row justify-content-center">
                    <div className="col-12">
                        <ImageList foundImages={this.state.images} hits={this.state.noHits} />
                    </div>
                </div>
            </div>
		);
	}
}

export default Main;