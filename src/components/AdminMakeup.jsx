import React, { useState, useRef, useEffect } from 'react';
import '../cssfolder/adminmakeup.css';
import axios from 'axios';
import { RiH3 } from 'react-icons/ri';

const AdminMakeup = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [samplePhotos, setSamplePhotos] = useState([]);
    const [currentId,setCurrentId]=useState();
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        rate: '',
        description: '',
        price: ''
    });
    const [state, setState] = useState(false);
    const [makeup, setMakeUp] = useState([]);
    const fileInputRef = useRef();
    const samplePhotosInputRef = useRef();

    const handleFileInputChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedImages(files);
    };

    const handleSamplePhotosChange = (event) => {
        const files = Array.from(event.target.files);
        setSamplePhotos(files);
    };

    const handleData = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setFormData(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const UploadMakeup = () => {
        const form = new FormData();
        form.append('name', formData.name);
        form.append('type', formData.type);
        form.append('rate', formData.rate);
        form.append('description', formData.description);
        form.append('price', formData.price);
        form.append('action', "upload makeup");

        selectedImages.forEach((image, index) => {
            form.append(`artistProfileImages[${index}]`, image);
        });

        samplePhotos.forEach((photo, index) => {
            form.append(`samplePhotos[${index}]`, photo);
        });

        axios.post('http://localhost/Event-Handling - Copy - Copy/src/Php_Folder/makeup.php', form)
            .then((response) => {
                setState(true);
                alert(response.data.message);
                setSamplePhotos([]);
                setSelectedImages([]);
                setFormData({
                    name: '',
                    type: '',
                    rate: '',
                    description: '',
                    price: ''
                });
                if (fileInputRef.current) fileInputRef.current.value = '';
                if (samplePhotosInputRef.current) samplePhotosInputRef.current.value = '';
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const retrieve = () => {
        const form1 = new FormData();
        form1.append('action', 'retrieve');
        axios.post('http://localhost/Event-Handling - Copy - Copy/src/Php_Folder/makeup.php', form1)
            .then(response => {
                console.log(response.data.data);
                setMakeUp(response.data.data);
            })
            .catch(error => {
                console.error('Error retrieving data:', error);
            });
    };

    useEffect(() => {
        retrieve();
        setState(false);
    }, [state]);

    const deleteMakeUp = (id) => {
        console.log(id);
        const form2 = new FormData();
        form2.append('id', id);
        form2.append('action', 'delete');
        axios.post('http://localhost/Event-Handling - Copy - Copy/src/Php_Folder/makeup.php', form2)
            .then(response => {
                setState(true);
            })
            .catch(error => {
                console.error('Error deleting data:', error);
            });
    };
    const Update=()=>{
        const form=new FormData();
        form.append('id',currentId);
        form.append()
    }
    return (
        <div>
            <div className="container">
                <div className="con">
                    <div className="makeup">
                        <div className="container">
                            <div className="main-content sd">
                                <div className="addimage-form">
                                    <div className="addimage-form-group">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="addimage-input"
                                            multiple
                                            onChange={handleFileInputChange}
                                            style={{ display: 'none' }}
                                            required
                                        />
                                        <button className="btn btn-primary" onClick={() => fileInputRef.current.click()}>
                                            Artist Profile
                                        </button>
                                    </div>
                                    <div className="addimage-form-group d-flex flex-wrap justify-content-center">
                                        {selectedImages &&
                                            selectedImages.map((image, index) => (
                                                <div className="image-preview d-flex flex-wrap" key={index}>
                                                    <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
                                                </div>
                                            ))}
                                    </div>
                                    <div className="addimage-form-group">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="addimage-input"
                                            placeholder="Name"
                                            required
                                            value={formData.name}
                                            onChange={handleData}
                                        />
                                    </div>
                                    <div className="addimage-form-group">
                                        <select name="type" className='artist-type' value={formData.type} onChange={handleData}>
                                            <option value="bride">BRIDE ARTIST</option>
                                            <option value="groom">GROOM ARTIST</option>
                                        </select>
                                    </div>
                                    <div className="addimage-form-group">
                                        <h2 className='rating-head'>Enter the Rating</h2>
                                        <div className="rate">
                                            {[5, 4, 3, 2, 1].map((star) => (
                                                <React.Fragment key={star}>
                                                    <input
                                                        type="radio"
                                                        id={`star${star}`}
                                                        name="rate"
                                                        value={star}
                                                        checked={formData.rate == star}
                                                        onChange={handleData}
                                                    />
                                                    <label htmlFor={`star${star}`} title="text">{star} star{star > 1 ? 's' : ''}</label>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="addimage-form-group">
                                        <textarea
                                            name="description"
                                            id="description"
                                            cols="40"
                                            rows="5"
                                            className="addimage-input"
                                            placeholder="Description about package"
                                            required
                                            value={formData.description}
                                            onChange={handleData}
                                        />
                                    </div>
                                    <div className="addimage-form-group">
                                        <input
                                            type="text"
                                            name="price"
                                            id="price"
                                            className="addimage-input"
                                            placeholder="Price"
                                            required
                                            value={formData.price}
                                            onChange={handleData}
                                        />
                                    </div>
                                    <div className="addimage-form-group">
                                        <input
                                            type="file"
                                            ref={samplePhotosInputRef}
                                            className="addimage-input"
                                            multiple
                                            onChange={handleSamplePhotosChange}
                                            style={{ display: 'none' }}
                                            required
                                        />
                                        <button className="btn btn-primary" onClick={() => samplePhotosInputRef.current.click()}>
                                            Sample Photos
                                        </button>
                                    </div>
                                    <div className="addimage-form-group d-flex flex-wrap justify-content-center">
                                        {samplePhotos &&
                                            samplePhotos.map((photo, index) => (
                                                <div className="image-preview d-flex flex-wrap" key={index}>
                                                    <img src={URL.createObjectURL(photo)} alt={`Sample Preview ${index}`} />
                                                </div>
                                            ))}
                                    </div>
                                    <div className="addimage-form-group">
                                        <button className="delete-btn" onClick={UploadMakeup}>
                                            Upload
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {makeup && (
                <div className="row sd-container">
                    {makeup.map((item, index) => (
                        <div className="col-12 mt-5 sd-content" key={index}>
                            <div className="main-div">
                                <img className="decoration-image" id="makeup-image" src={`/src/makeup/${item.artist_profile_images.split(",")[0]}`} alt="Stage Decoration" />
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
                            {item.name && item.name !== "undefined" && (
                                <div className="sd-title">
                                    <h3>{item.name}</h3>
                                </div>
                            )}
                            {item.type && item.type !== "undefined" && (
                                <div className="sd-description">
                                    <p>Type: {item.type} artist</p>
                                </div>
                            )}
                            {item.description && item.description !== "undefined" && (
                                <div className="sd-description">
                                    <p>{item.description}</p>
                                </div>
                            )}
                            {item.price && item.price !== "undefined" && (
                                <div className="sd-price">
                                    <h3>Price: ${item.price}</h3>
                                </div>
                            )}
                            <h3 style={{fontSize:"20px",fontWeight:"800"}}>sample photos</h3>
                            <div className="img-div" >
                            {item.sample_photos && item.sample_photos.split(",").map((photo, index) => (
                                <div className="mai-div" key={index} >
                                    <img className="e"  id="makeup-image" src={`/src/makeup/${photo}`} alt="Stage Decoration" />
                                </div>
                            
                            ))}
                            </div>
                            <div className="sd-button">
                                <button className="sd-btn" onClick={() => deleteMakeUp(item.id)}>DELETE</button>
                                <button className="sd-btn" data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={()=>{setCurrentId(item.id)}}>EDIT</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}


<div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="stagedecoration-model">
                            <div className="addimage-form-group">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="addimage-input"
                                            multiple
                                            onChange={handleFileInputChange}
                                            style={{ display: 'none' }}
                                            required
                                        />
                                        <button className="btn btn-primary" onClick={() => fileInputRef.current.click()}>
                                            Artist Profile
                                        </button>
                                    </div>
                                <div className="stagedecoration-edit-model d-flex flex-wrap justify-content-center">
                                {selectedImages &&
                                            selectedImages.map((image, index) => (
                                                <div className="image-preview d-flex flex-wrap" key={index}>
                                                    <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
                                                </div>
                                            ))}
                                </div>
                                <div className="stagedecoration-edit-model">
                                <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="addimage-input"
                                            placeholder="Name"
                                            required
                                            value={formData.name}
                                            onChange={handleData}
                                        />
                                </div>
                                <div className="stagedecoration-edit-model">
                                <select name="type" className='artist-type' value={formData.type} onChange={handleData}>
                                            <option value="bride">BRIDE ARTIST</option>
                                            <option value="groom">GROOM ARTIST</option>
                                        </select>
                                </div>
                                <div className="stagedecoraton-edit-model">
                                <h2 className='rating-head'>Enter the Rating</h2>
                                        <div className="rate">
                                            {[5, 4, 3, 2, 1].map((star) => (
                                                <React.Fragment key={star}>
                                                    <input
                                                        type="radio"
                                                        id={`star${star}`}
                                                        name="rate"
                                                        value={star}
                                                        checked={formData.rate == star}
                                                        onChange={handleData}
                                                    />
                                                    <label htmlFor={`star${star}`} title="text">{star} star{star > 1 ? 's' : ''}</label>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                </div>
                                <div className="addimage-form-group">
                                        <textarea
                                            name="description"
                                            id="description"
                                            cols="40"
                                            rows="5"
                                            className="addimage-input"
                                            placeholder="Description about package"
                                            required
                                            value={formData.description}
                                            onChange={handleData}
                                        />
                                    </div>
                                    <div className="addimage-form-group">
                                        <input
                                            type="text"
                                            name="price"
                                            id="price"
                                            className="addimage-input"
                                            placeholder="Price"
                                            required
                                            value={formData.price}
                                            onChange={handleData}
                                        />
                                    </div>
                                    <div className="addimage-form-group">
                                        <input
                                            type="file"
                                            ref={samplePhotosInputRef}
                                            className="addimage-input"
                                            multiple
                                            onChange={handleSamplePhotosChange}
                                            style={{ display: 'none' }}
                                            required
                                        />
                                        <button className="btn btn-primary" onClick={() => samplePhotosInputRef.current.click()}>
                                            Sample Photos
                                        </button>
                                    </div>
                                    <div className="addimage-form-group d-flex flex-wrap justify-content-center">
                                        {samplePhotos &&
                                            samplePhotos.map((photo, index) => (
                                                <div className="image-preview d-flex flex-wrap" key={index}>
                                                    <img src={URL.createObjectURL(photo)} alt={`Sample Preview ${index}`} />
                                                </div>
                                            ))}
                                    </div>
                                <div className="stagedecoration-edit-model">
                                    <button className='update-btn' onClick={()=>Update()}>Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>








        </div>
    );
};

export default AdminMakeup;
