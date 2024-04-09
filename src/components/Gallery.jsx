import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Correct import statement
import '../cssfolder/Gallery.css';

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost/Event-Handling - Copy - Copy/src/Php_Folder/Retrieval.php', { action: "gallery-retrieval" });
        if (response.data.status === "200") {
          console.log(response.data.images);
          setGalleryImages(response.data.images);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      }
    };
    
    fetchData();
  }, []);

  const navigate = useNavigate();
  
  return (
    <div>
      <div className="container-fluid">
        <div className="button">
          <button className='btn btn-secondary' onClick={() => { navigate("/Home") }}>BACK</button>
        </div>
        <div className="head_content">
          <h2 className='gallery_head'>GALLERY</h2>
        </div>
        <div className="row d-flex justify-content-center">
          {galleryImages.map((image, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 ">
              <img src={`/src/Gallery_Images/${image.image}`}  alt="" className="img-fluid  gallery_image" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
