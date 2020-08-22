import React from 'react';
import Header from './header/Header'
import Main from './main/Main'
import Footer from './footer/Footer'

class App extends React.Component  {
    render() {
        return (
            <div id="appwrapper">
                <Header />
                <Main />
                <Footer />
            </div>
        )
    }
    
}

export default App;