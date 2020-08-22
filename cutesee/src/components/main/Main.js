import React from 'react';
import axios from 'axios';
//import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';
import SearchBar from '/home/kanta/cutesee/cutesee/src/components/searchBar/SearchBar'
import Suggestions from '/home/kanta/cutesee/cutesee/src/components/suggestions/Suggestions'
import ImageList from '/home/kanta/cutesee/cutesee/src/components/imageList/ImageList'

/*const server = axios.create({
    baseURL: '/api',
    headers: { 'Cache-Control': 'no-cache' },
	adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter), {threshold: 86400000})
});*/


class Main extends React.Component {
    state = { images: [] };


	onSearchSubmit = async (term) => {
        const cachedHits = localStorage.getItem(term);
        const now = new Date();
        const dateKey = `${term} date`;
        const lastStored = localStorage.getItem(dateKey);
        console.log(lastStored);
        let diff = 1;
        if (lastStored !== null) {
            var obj = JSON.parse(lastStored);
            var oldDate = new Date(obj['date']);
            diff = (now.getTime() - oldDate.getTime())/(86400000);
        }   
        console.log(diff);
        if (cachedHits && diff < 1) {
            this.setState({ images: JSON.parse(cachedHits) });
        } else {
            if (cachedHits) {
                localStorage.removeItem(term);
                localStorage.removeItem(dateKey);
            }
            try {
                const response = await axios.get(`/api/${term}`);
                console.log(response);
                localStorage.setItem(term, JSON.stringify(response.data.hits));
                localStorage.setItem(dateKey, JSON.stringify({'date': new Date()}));
                this.setState({ images: response.data.hits});
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
                        <ImageList foundImages={this.state.images} />
                    </div>
                </div>
            </div>
		);
	}
}

export default Main;