import Axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

const AdminDJ = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [djPackages, setDjPackages] = useState([]);
    const [editDjId, setEditDjId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editPrice, setEditPrice] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const fileInputRef = useRef(null);
    const [state, setState] = useState(false);

    const handleFileInputChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages(prevImages => [...prevImages, ...files]);
    };

    const uploadDJ = () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('action', 'upload_dj');

        selectedImages.forEach((image, index) => {
            formData.append(`images[]`, image);
        });

        Axios.post('http://localhost/Event-Handling - Copy - Copy/src/Php_Folder/dj.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            alert(response.data.message);
            setState(true);
            setSelectedImages([]); // Clear images after upload
        }).catch((error) => {
            console.error("There was an error uploading the DJ package!", error);
        });
    };

    const retrieveDJ = () => {
        Axios.post('http://localhost/Event-Handling - Copy - Copy/src/Php_Folder/dj.php', {
            action: 'retrieve_dj'
        }).then((response) => {
            setDjPackages(response.data.data);
        }).catch((error) => {
            console.error("There was an error retrieving the DJ packages!", error);
        });
    };

    useEffect(() => {
        retrieveDJ();
        if (state) {
            setState(false);
        }
    }, [state]);

    const deleteDj = (id) => {
        Axios.post('http://localhost/Event-Handling - Copy - Copy/src/Php_Folder/dj.php', {
            id: id,
            action: 'delete_dj'
        }).then((response) => {
            alert(response.data.message);
            setState(true);
        }).catch((error) => {
            console.error("There was an error deleting the DJ package!", error);
        });
    };

    const editDj = () => {
        const formData = new FormData();
        formData.append('id', editDjId);
        formData.append('title', editTitle);
        formData.append('price', editPrice);
        formData.append('description', editDescription);
        formData.append('action', 'edit_dj');
    
        selectedImages.forEach((image, index) => {
            formData.append('images[]', image);
        });
    
        // Log the FormData contents
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
    
        Axios.post('http://localhost/Event-Handling - Copy - Copy/src/Php_Folder/dj.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response.data+" ok");
            alert("updated successfully");
            setState(true);
            setSelectedImages([]); // Clear images after update
        }).catch((error) => {
            console.error("There was an error updating the DJ package!", error);
        });
    };
    

    const handleEditButtonClick = (item) => {
        setEditDjId(item.id);
        setEditTitle(item.title);
        setEditPrice(item.price);
        setEditDescription(item.description);
        setSelectedImages([]);
    };

    return (
        <div>
            <div className="admin-dj">
                <div className="container">
                    <div className="main-content dj">
                        <div className="addimage-form">
                            <div className="addimage-form-group">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className='addimage-input'
                                    multiple
                                    onChange={handleFileInputChange}
                                    style={{ display: 'none' }}
                                    required
                                />
                                <button className='btn btn-primary' onClick={() => fileInputRef.current.click()}>
                                    Select Images
                                </button>
                            </div>
                            <div className="addimage-form-group d-flex flex-wrap justify-content-center">
                                {selectedImages && selectedImages.map((image, index) => (
                                    <div className="image-preview d-flex flex-wrap" key={index}>
                                        <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
                                    </div>
                                ))}
                            </div>
                            <div className="addimage-form-group">
                                <input
                                    type="text"
                                    name="price"
                                    id="price"
                                    className="addimage-input"
                                    placeholder="Price"
                                    required
                                    onChange={(e) => { setPrice(e.target.value) }}
                                />
                            </div>
                            <div className="addimage-form-group">
                                <input
                                    type="text"
                                    name="dj-title"
                                    id="dj-title"
                                    className="addimage-input"
                                    placeholder="Title"
                                    required
                                    onChange={(e) => { setTitle(e.target.value) }}
                                />
                            </div>
                            <div className="addimage-form-group">
                                <textarea
                                    name="description"
                                    id="description"
                                    cols="40"
                                    rows="5"
                                    className="dj-description-input"
                                    placeholder="Description about package"
                                    required
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="addimage-form-group">
                                <button className="btn btn-primary" onClick={uploadDJ}>Upload</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {djPackages && (
                <div className="row sd-container">
                    {djPackages.map((item, index) => (
                        <div className="col-12 mt-5 sd-content" key={index}>
                            <div className="sd-images">
                                {item.images.split(",").map((imageName, idx) => (
                                    <img key={idx} src={`/src/DJ-images/${imageName.trim()}`} alt={`DJ ${idx}`} />
                                ))}
                            </div>
                            <div className="sd-title">
                                <h3>{item.title}</h3>
                            </div>
                            <div className="sd-description">
                                <p>{item.description}</p>
                            </div>
                            <div className="sd-price">
                                <h3>Price: {item.price}</h3>
                            </div>
                            <div className="sd-button">
                                <button className="sd-btn" onClick={() => deleteDj(item.id)}>DELETE</button>
                                <button className="sd-btn" data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={() => handleEditButtonClick(item)}>EDIT</button>
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
                                <div className="stagedecoration-edit-model">
                                    <input type="file" ref={fileInputRef} className='addimage-input' multiple onChange={handleFileInputChange} style={{ display: 'none' }} />
                                    <button className='btn btn-primary' onClick={() => fileInputRef.current.click()}>
                                        Select Images
                                    </button>
                                </div>
                                <div className="stagedecoration-edit-model d-flex flex-wrap justify-content-center">
                                    {selectedImages && selectedImages.map((image, index) => (
                                        <div className="image-preview d-flex flex-wrap" key={index}>
                                            <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
                                        </div>
                                    ))}
                                </div>
                                <div className="stagedecoration-edit-model">
                                    <input
                                        type="text"
                                        name="updateprice"
                                        id="updataprice"
                                        className='addimage-input'
                                        placeholder='Price'
                                        value={editPrice}
                                        onChange={(e) => setEditPrice(e.target.value)}
                                    />
                                </div>
                                <div className="stagedecoration-edit-model">
                                    <input
                                        type="text"
                                        name="updatesd-title"
                                        id="updatesd-title"
                                        className='addimage-input'
                                        placeholder='Title'
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                    />
                                </div>
                                <div className="stagedecoration-edit-model">
                                    <textarea
                                        name="updatedescription"
                                        id="updatedescription"
                                        cols="40"
                                        rows="5"
                                        className='addimage-input'
                                        placeholder='Description about package'
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                    />
                                </div>
                                <div className="stagedecoration-edit-model">
                                    <button className='update-btn' onClick={editDj}>Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDJ;
