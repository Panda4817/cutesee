import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';

class SearchBar extends React.Component {
    state = { val: '' }

    onInputChange = (event) => {
        if (event.target.value !== ''){
            this.setState({ val: event.target.value })
        }
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        if (this.state.val !== '')
            this.props.userSubmit(this.state.val);
        this.setState({val: ''});
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <form  onSubmit={this.onFormSubmit} className="col-12">
                        <div className="input-group mb-3 shadow-lg">
                            <input 
                                id="searchBox" 
                                type="text" 
                                className="form-control form-control-lg" 
                                placeholder="What cute things would you like to see?" 
                                aria-label="search box" 
                                aria-describedby="image search"
                                value={this.state.val}
                                onChange={this.onInputChange}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-outline-success" type="submit" id="searchButton">
                                    <FontAwesomeIcon icon={faSearch} className="searchIcon" />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default SearchBar;