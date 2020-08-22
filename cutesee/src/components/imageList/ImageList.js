import React from 'react';

const ImageList = (props) => {
    const imgs = props.foundImages.map(img => {
        return (
            <div key={img.id} className="card">
               <img className="card-img img-fluid" src={img.webformatURL} alt={img.tags} />
            </div> 
        )
    });

    return (
            <div className="card-columns">
                {imgs}
            </div>
    )
}

export default ImageList;