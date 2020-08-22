import React from 'react';
import Header from './header/Header';
import Main from './main/Main';
import Footer from './footer/Footer';
import ScrollArrow from './scrollArrow/ScrollArrow'

class App extends React.Component  {
    render() {
        return (
            <div id="appwrapper">
                <ScrollArrow />
                <Header />
                <Main />
                <Footer />
            </div>
        )
    }
    
}

export default App;