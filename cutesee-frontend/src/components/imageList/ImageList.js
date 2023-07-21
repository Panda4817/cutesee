import React from 'react';

const ImageList = (props) => {
    let imgs = props.foundImages.map(img => {
        return (
            <div key={img.id} className="card">
            <img className="card-img img-fluid" src={img.webformatURL} alt={img.tags} />
            </div> 
        )
    }); 
    if (imgs.length === 0 && props.hits === true) {
        let noHitsMsg = (<p>(≥o≤) Sorry, Pixabay cannot find any images. Try the suggestions. :)</p>);
        return noHitsMsg;
    }
        
    return (
            <div className="card-columns">
                {imgs}
            </div>
    )
}

export default ImageList;