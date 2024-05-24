import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../cssfolder/makeup.css';
const Makeup = () => {
    const [makeup, setMakeup] = useState([]);
    const [currentMakeupDetail, setCurrentMakeupDetail] = useState(null);

    function back() {
        window.history.back();
    }

    function retrieveData() {
        const form1 = new FormData();
        form1.append('action', 'retrieve');
        axios.post('http://localhost/Event-Handling - Copy - Copy/src/Php_Folder/makeup.php', form1)
            .then(response => {
                console.log(response.data.data);
                setMakeup(response.data.data);
            })
            .catch(error => {
                console.error('Error retrieving data:', error);
            });
    }

    useEffect(() => {
        retrieveData();
    }, []);

    return (
        <div>
            <div className="row mt-4 w-25">
                <div className="btn back-btn float-start ms-5" onClick={back}>back</div>
            </div>
            <div className="makeup">
                <div className="makeup-heading">
                    <span className='makeup-title'>MAKEUP</span>
                </div>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-12 mt-5">
                            {makeup && makeup.map((item, index) => (
                                <div className="dec" key={index}>
                                    <div className="main-div sm-12 md-6">
                                        <img className="makeup-image" src={`/src/makeup/${item.artist_profile_images.split(",")[0]}`} alt="Makeup" />
                                        <div className="star-rating">
                                            {item.rate && (
                                                <div className="stars">
                                                    {[...Array(parseInt(item.rate))].map((_, i) => (
                                                        <span key={i} className="star">&#9733;</span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="makeup-text">
                                        {item.name && item.name !== "undefined" && (
                                            <div className="makeup">
                                                <span className='makeup-heading' style={{ textTransform: 'uppercase' }}>{item.name}</span>
                                            </div>
                                        )}
                                        <div className="makeup-detail">
                                            {item.description && item.description !== "undefined" && (
                                                <p className='makeup-detail-p'>{item.description}</p>
                                            )}
                                        </div>
                                        <div className="type">
                                            {item.type && item.type !== "undefined" && (
                                                <h2 style={{ fontWeight: 600, opacity: 0.5, textTransform: 'uppercase' }}>type : {item.type} artist</h2>
                                            )}
                                        </div>
                                        {item.price !== 0 && (
                                            <div className="cost">
                                                <h4 className='cost-font'>Price: ${item.price}</h4>
                                            </div>
                                        )}
                                        <div className="button">
                                            <button
                                                type='button'
                                                className='makeup-button mb-5'
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                                onClick={() => { setCurrentMakeupDetail(item) }}
                                            >
                                                VIEW DETAILS
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {currentMakeupDetail && (
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered model-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">{currentMakeupDetail.name}</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="makeup-model-content container-fluid">
                                        <div className="makeup-images">
                                            {currentMakeupDetail.artist_profile_images.split(",").map((image, index) => (
                                                <img key={index} src={`/src/makeup/${image}`} alt="Makeup" />
                                            ))}
                                        </div>
                                        <div className="makeup-title">
                                            <h3>{currentMakeupDetail.name}</h3>
                                            <div className="makeup-description">
                                                <p>{currentMakeupDetail.description}</p>
                                            </div>
                                            <div className="makeup-cost">
                                                <h4>Price: ${currentMakeupDetail.price}</h4>
                                            </div>
                                            <button className='makeup-button placeorder-button'>PLACE ORDER</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Makeup;
