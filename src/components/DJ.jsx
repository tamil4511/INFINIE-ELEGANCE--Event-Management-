import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../cssfolder/DJ.css';
import dj from '../assets/dj-image-3.webp';
import dj1 from '../assets/dj-image-2.webp';
import dj2 from '../assets/dj-image-4.jpg';
import dj3 from '../assets/dj-image-5.jpg';
import dj4 from '../assets/dj.jpg';
import dj5 from '../assets/DJ1.jpg';
import dj6 from '../assets/banner.jpeg';
import dj7 from '../assets/stage1.jpg';

const DJ = () => {
  const [bannerimages, setImages] = useState([dj, dj1, dj2, dj3, dj4, dj5, dj6, dj7]);
  const [djPackages, setDjPackages] = useState([]);
  const [currentDj, setCurrentDj] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setImages(prevImages => {
        const rotatedImages = [...prevImages];
        const firstImage = rotatedImages.shift();
        rotatedImages.push(firstImage);
        return rotatedImages;
      });
    }, 3000); // Change the interval time according to your preference

    djRetrieval();

    return () => clearInterval(interval);
  }, []);

  const djRetrieval = () => {
    axios.post('http://localhost/Event-Handling - Copy - Copy/src/Php_Folder/dj.php', { action: "retrieve_dj" })
      .then(response => {
        console.log("DJ packages retrieved successfully!", response.data.data);
        setDjPackages(response.data.data);
      })
      .catch(error => {
        console.error("There was an error retrieving the DJ packages!", error);
      });
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div>
      <div className="dj-heading1">
        <div className="btn-back" onClick={handleBack}>back</div>
        <span className='dj-title'>TOP SELECTIONS</span>
        <div className="dj-banner mt-5">
          {bannerimages.map((image, index) => (
            <img key={index} src={image} alt="" />
          ))}
        </div>
        <div className="container mt-5">
          <div className="row">
            {djPackages && djPackages.map((djPackage, index) => {
              const djImage = djPackage.images.split(",")[0]; 
              return (
                <div className="col-12 mt-5" key={index}>
                  <div className="dec">
                    <img className="dj-image" src={`../DJ-Images/${djImage}`} alt="Stage dj" />
                    <div className="dj-text">
                      <div className="dj-tt">
                        <span className='dj-heading'>{djPackage.title}</span>
                      </div>
                      <div className="dj-detail">
                        <p className='dj-detail-p'>{djPackage.description}</p>
                      </div>
                      <div className="cost">
                        <h4 className='dj-cost-font'>cost: {djPackage.price}</h4>
                      </div>
                      <div className="button">
                        <button 
                          type='button' 
                          className='dj-button' 
                          data-bs-toggle="modal" 
                          data-bs-target="#exampleModal2"
                          onClick={() => setCurrentDj(djPackage)}
                        >
                          VIEW DETAILS
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {currentDj && (
        <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">{currentDj.title}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="stagedecoration-model-content container-fluid">
                  <div className="stagedecoration-images">
                    {currentDj.images.split(",").map((image, index) => (
                      <img key={index} src={`../DJ-Images/${image}`} alt="Stage Decoration" />
                    ))}
                  </div>
                  <div className="stagedecoration-title">
                    <h3>{currentDj.title}</h3>
                    <div className="stagedecoration-description">
                      <p>{currentDj.description}</p>
                    </div>
                    <div className="stagedecoration-cost">
                      <h4>Price: {currentDj.price}</h4>
                    </div>
                    <button className='decoration-button placeorder-button'>PLACE ORDER</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DJ;
