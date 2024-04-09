import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios library correctly
import '../cssfolder/StageDecoration.css';
import decoration from '../assets/banner.jpeg';
import { useLocation } from 'react-router-dom';

const StageDecoration = () => {
  const [stageDecorationContent, setStageDecorationContent] = useState([]);
  const [currentStageDecorationModelContent, setCurrentStageDecorationModelContent] = useState(null); // Initialize to null
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost/Event-Handling - Copy - Copy/src/Php_Folder/Retrieval.php', { action: "stage-decoration-retrieval" });
        if (response.data.status === "200") {
          const stageDecorationImages = response.data.stageDecoration.map(item => ({
            id: item.id,
            title: item.title,
            description: item.description,
            price: item.price,
            // Split the images string and store as an array
            images: item.images.split(',')
          }));
          setStageDecorationContent(stageDecorationImages);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const location = useLocation(); // Accessing location object
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (location.state && location.state.value) {
      setEmail(location.state.value.email);
      setPassword(location.state.value.password);
    }
  }, [location.state]);
  console.log(email, password, "rohithsarm");

  const currentStageDecorationContent = (id) => {
    const currentStageDecoration = stageDecorationContent.find(item => item.id === id);
    setCurrentStageDecorationModelContent(currentStageDecoration);
  };

  return (
    <div>
      <div className="row w-25">
        <div className="btn btn-warning float-start ms-5">back</div>
      </div>
      <div className="stageDecoration">
        <div className="stageDecoration-heading">
          <span className='stageDecoration-title'>STAGE DECORATION</span>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-12 mt-5">
              {stageDecorationContent.map((item, index) => (
                <div className="dec" key={index}>
                  <img className="decoration-image" src={`/src/StageDecorationImages/${item.images[0]}`} alt="Stage Decoration" />
                  <div className="decoration-text">
                    <div className="decoration-title">
                      <span className='decoration-heading'>{item.title}</span>
                    </div>
                    <div className="decoration-detail">
                      <p className='decoration-detail-p'>{item.description}</p>
                    </div>
                    <div className="cost">
                      <h4 className='cost-font'>Price: ${item.price}</h4>
                    </div>
                    <div className="button">
                      <button type='button' className='decoration-button mb-5' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { currentStageDecorationContent(item.id) }}>VIEW DETAILS</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered model-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {currentStageDecorationModelContent && (
                  <div className="stagedecoration-model-content container-fluid">
                    <div className="stagedecoration-images">
                    {currentStageDecorationModelContent.images.map((image, index) => (
                      <img key={index} src={`/src/StageDecorationImages/${image}`} alt="Stage Decoration" />
                    ))}
                    </div>
                    <div className="stagedecoration-title">
                      <h3>{currentStageDecorationModelContent.title}</h3>
                      <div className="stagedecoration-description">
                        <p>{currentStageDecorationModelContent.description}</p>
                      </div>
                      <div className="stagedecoration-cost">
                        <h4>Price: {currentStageDecorationModelContent.price}</h4>
                      </div>
                      <button className='decoration-button placeorder-button'>PLACE ORDER</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageDecoration;
