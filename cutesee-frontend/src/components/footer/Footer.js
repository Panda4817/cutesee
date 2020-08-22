import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import './Footer.css'

class Footer extends React.Component {
	render() {
		let x = new Date().getFullYear();
		return (
			<footer id="footer" className="container">
				<div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <a href="https://pixabay.com/" className="text-decoration-none">
                            <img className="shadow-lg rounded w-50" src="https://pixabay.com/static/img/public/leaderboard_b.png" alt="Pixabay" />
                        </a>
                    </div> 
                </div>
                <div className="row justify-content-center">
					<div className="col-12 text-center">
						<p id="footer_text">
							Life is BEAUTIFUL! Always keep SMILING!<br />
							<FontAwesomeIcon icon={faCopyright} /> {x}
						</p>
					</div>
				</div>
			</footer>
		);
	}
}


export default Footer;