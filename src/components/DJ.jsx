import React from 'react'
import '../cssfolder/DJ.css'
import { useState, useEffect } from 'react';
import dj from '../assets/dj-image-3.webp'
import dj1 from '../assets/dj-image-2.webp'
import dj2 from '../assets/dj-image-4.jpg'
import dj3 from '../assets/dj-image-5.jpg'
import dj4 from '../assets/dj.jpg'
import dj5 from '../assets/DJ1.jpg'
import dj6 from '../assets/banner.jpeg'
import dj7 from '../assets/stage1.jpg'
const DJ = () => {
  const [bannerimages, setImages] = useState([dj, dj1, dj2, dj3,dj4,dj5,dj6,dj7]);

  useEffect(() => {
    const interval = setInterval(() => {
      setImages(prevImages => {
        const rotatedImages = [...prevImages];
        const firstImage = rotatedImages.shift();
        rotatedImages.push(firstImage);
        return rotatedImages;
      });
    }, 3000); // Change the interval time according to your preference

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="dj-heading1">
          <span className='dj-title'>TOP SELECTIONS</span>
          <div className="dj-banner mt-5">
          {bannerimages.map((image, index) => (
          <img key={index} src={image} alt="" />
        ))}
          </div>
          <div className="container mt-5">
          <div className="row">
            <div className="col-12 mt-5">
              <div className="dec">
                <img className="dj-image" src={dj1} pan="Stage dj" />
                <div className="dj-text">
                  <div className="dj-tt">
                    <span className='dj-heading'>Stage dj</span>
                  </div>
                  <div className="dj-detail">
                    <p className='dj-detail-p'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, a natus nulla velit commodi laudantium veritatis rerum! Minima quae sed, cum aspernatur veritatis eligendi ipsa inventore, omnis, mollitia voluptas consequatur.</p>
                  </div>
                  <div className="cost">
                    <h4 className='dj-cost-font'>cost: 4500</h4>
                  </div>
                  <div className="button">
                    <button type='button' className='dj-button' data-bs-toggle="modal" data-bs-target="#exampleModal">VIEW DETAILS</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 mt-5">
              <div className="dec">
                <img className="dj-image" src={dj1} pan="Stage dj" />
                <div className="dj-text">
                  <div className="dj-tt">
                    <span className='dj-heading'>Stage dj</span>
                  </div>
                  <div className="dj-detail">
                    <p className='dj-detail-p'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, a natus nulla velit commodi laudantium veritatis rerum! Minima quae sed, cum aspernatur veritatis eligendi ipsa inventore, omnis, mollitia voluptas consequatur.</p>
                  </div>
                  <div className="cost">
                    <h4 className='dj-cost-font'>cost: 4500</h4>
                  </div>
                  <div className="button">
                    <button type='button' className='dj-button' data-bs-toggle="modal" data-bs-target="#exampleModal">VIEW DETAILS</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 mt-5">
              <div className="dec">
                <img className="dj-image" src={dj1} pan="Stage dj" />
                <div className="dj-text">
                  <div className="dj-tt">
                    <span className='dj-heading'>Stage dj</span>
                  </div>
                  <div className="dj-detail">
                    <p className='dj-detail-p'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, a natus nulla velit commodi laudantium veritatis rerum! Minima quae sed, cum aspernatur veritatis eligendi ipsa inventore, omnis, mollitia voluptas consequatur.</p>
                  </div>
                  <div className="cost">
                    <h4 className='dj-cost-font'>cost: 4500</h4>
                  </div>
                  <div className="button">
                    <button type='button' className='dj-button' data-bs-toggle="modal" data-bs-target="#exampleModal">VIEW DETAILS</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default DJ
