import React from "react";
import './Header.css'

class Header extends React.Component {
	render() {
		return (
			<header id="header" className="container">
				<div className="row justify-content-center">
					<div id="title" className="col-12 text-center">
            			<h1>CuteSee</h1>
					</div>
				</div>
        <div className="row justify-content-center">
					<div id="subtitle" className="col-12 text-center">
            <p>Relieve stress with CUTE pictures</p>
					</div>
				</div>
			</header>
		);
	}
}


export default Header;