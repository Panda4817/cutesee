import React from 'react';
import "./Suggestions.css"

class Suggestions extends React.Component {

    onClickChange = (event) => {
        this.props.userSubmit(event.target.value);
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12 p-1">
                        <input onClick={this.onClickChange} className="btn btn-outline-light sugBtn btn-lg btn-block" type="button" value="Cat" />
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12 p-1">
                        <input onClick={this.onClickChange} className="btn btn-outline-light sugBtn btn-lg btn-block" type="button" value="Puppy" />
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12 p-1">
                        <input onClick={this.onClickChange} className="btn btn-outline-light sugBtn btn-lg btn-block" type="button" value="Rabbit" /> 
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12 p-1">
                        <input onClick={this.onClickChange} className="btn btn-outline-light sugBtn btn-lg btn-block" type="button" value="Hedgehog" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Suggestions;