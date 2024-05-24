import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/logo.png';
import axios from 'axios';
import img from '../assets/dj.jpg'
import '../cssfolder/AdminDashboard.css';
import AdminDJ from './AdminDJ';
import AdminMakeup from './AdminMakeup';

const AdminDashboard = () => {
    const [stageDecorationContent, setStageDecorationContent] = useState([{}]);
    const [users, setUsers] = useState([]);
    const [ActiveStatus, setActiveStatus] = useState('user');
    const [galleryImages, setGalleryImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [image, setImage] = useState('null');
    const fileInputRef = useRef(null);
    const [editStageDecorationId, setEditStageDecorationId] = useState(null);

    useEffect(() => {
        const data = { action: "users-retrieval" };
        axios.post('http://localhost/Event-Handling - Copy - Copy/src/Php_Folder/Retrieval.php', data)
            .then((Response) => {
                if (Response.data.status === "200") {
                    setUsers(Response.data.users);
                } else {
                    console.log(Response.data.message);
                }
            });
    }, []);

    useEffect(() => {
        StageDecorationretrival();
    }, []);






    const addImage = (e) => {
        setImage(e.target.files[0]); // Extract the file from the event object and set it as the image state
    }

    const UploadImage = () => {
        const formData = new FormData();
        formData.append('image', image); // Corrected to append image data
        axios.post('http://localhost/Event-Handling - Copy - Copy/src/Php_Folder/Gallery.php', formData)
            .then((Response) => {
                const imageInput = document.getElementById('image');
                imageInput.value = ''; // Clear the input field after upload
                alert(Response.data.message);
                Galleryretrival();
            });
    }
    const deleteImage = (id) => {
        console.log(id);
        const data = { action: "delete-image", id: id };
        axios.post('http://localhost/Event-Handling - Copy - Copy/src/Php_Folder/Retrieval.php', data)
            .then((Response) => {
                console.log(Response);
                alert(Response.data.message);
                Galleryretrival();
            });
    }








    const Galleryretrival = () => {
        const data = { action: "gallery-retrieval" };
        axios.post('http://localhost/Event-Handling - Copy - Copy/src/Php_Folder/Retrieval.php', data)
            .then((Response) => {
                if (Response.data.status === "200") {
                    console.log(Response.data.images);
                    setGalleryImages(Response.data.images);
                } else {
                    console.log(Response.data.message);
                }
            });
    };
    useEffect(() => {
        Galleryretrival();
    }, []);

    const deleteUser = (id) => {
        const data = { action: "delete-user", id: id };
        axios.post('http://localhost/Event-Handling - Copy - Copy/src/Php_Folder/Retrieval.php', data)
            .then((Response) => {
                alert(Response.data.message);
                if (Response.data.status === "200") {
                    const newUsers = users.filter((user) => user.id !== id);
                    setUsers(newUsers);
                }
            });
    };


    const StageDecorationretrival = () => {
        const data = { action: "stage-decoration-retrieval" };
        axios.post('http://localhost/Event-Handling - Copy - Copy/src/Php_Folder/Retrieval.php', data)
            .then((Response) => {
                if (Response.data.status === "200") {
                    // Map over the stageDecoration array and set the state for each item
                    const stageDecorationImages = Response.data.stageDecoration.map(item => ({
                        id: item.id,
                        title: item.title,
                        description: item.description,
                        price: item.price,
                        // Split the images string and store as an array
                        images: item.images.split(',')
                    }));
                    // console.log(stageDecorationImages);
                    setStageDecorationContent(stageDecorationImages);
                } else {
                    console.log(Response.data.message);
                }
            });
        // stageDecorationContent.map((item, index) => {
        //     item.images.map((imageString, index) => {
        //         console.log(imageString);
        //     });

        // });

    };



    const handleFileInputChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages(prevImages => [...prevImages, ...files]);
    };

    const UploadStageDecoration = () => {
        const images = selectedImages.map(image => image.name);
        const price = document.getElementById('price').value;
        const title = document.getElementById('sd-title').value;
        const description = document.getElementById('description').value;

        const formData = new FormData();
        formData.append('action', 'stage-decoration-upload');
        formData.append('price', price);
        formData.append('title', title);
        formData.append('description', description);
        selectedImages.forEach(file => {
            formData.append('images[]', file);
        });

        axios.post('http://localhost/Event-Handling - Copy - Copy/src/Php_Folder/StageDecoration.php', formData)
            .then((Response) => {
                if (Response.status === 200) {
                    alert("uploaded successfully");
                }
                setSelectedImages([]);
                document.getElementById('price').value = '';
                document.getElementById('sd-title').value = '';
                document.getElementById('description').value = '';
                StageDecorationretrival(); // Fetch updated data after upload
            });
    };
    const deleteStageDecoration = (id) => {
        const data = { action: "delete-stage-decoration", id: id };
        axios.post('http://localhost/Event-Handling - Copy - Copy/src/Php_Folder/Retrieval.php', data)
            .then((Response) => {
                alert(Response.data.message);
                StageDecorationretrival();
            });
    };


    const updateStageDecoration=()=>
    {
        var title=document.getElementById('updatesd-title').value;
        var description=document.getElementById('updatedescription').value;
        var price=document.getElementById('updataprice').value;
        const formData = new FormData();
        formData.append('action', 'update-stage-decoration');
        formData.append('price', price);
        formData.append('title', title);
        formData.append('id', editStageDecorationId);
        formData.append('description', description);
        selectedImages.forEach(file => {
            formData.append('images[]', file);
        });
        axios.post('http://localhost/Event-Handling - Copy - Copy/src/Php_Folder/StageDecoration.php', formData)
            .then((Response) => {
                if (Response.status === 200) {
                    alert("updated successfully");
                }
                setSelectedImages([]);
                document.getElementById('updataprice').value = '';
                document.getElementById('updatesd-title').value = '';
                document.getElementById('updatedescription').value = '';
                
                StageDecorationretrival(); // Fetch updated data after upload
            });
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top">
                <div className="container-fluid">
                    <img src={logo} alt="" className='img' />
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Logo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <a className={`nav-link mx-lg-2 ${ActiveStatus === "user" ? 'active' : ''}`} href="#" onClick={() => setActiveStatus("user")}>Users</a>
                                </li>
                                <li className="nav-item">
                                    <a className={`nav-link mx-lg-2  ${ActiveStatus === "gallery" ? 'active' : ''}`} href="#" onClick={() => setActiveStatus("gallery")}>Gallery</a>
                                </li>
                                <li className="nav-item">
                                    <a className={`nav-link mx-lg-2 ${ActiveStatus === "stage decoration" ? 'active' : ''}`} href="#" onClick={() => setActiveStatus("stage decoration")}>Stage Decoration</a>
                                </li>
                                <li className="nav-item">
                                    <a className={`nav-link mx-lg-2 ${ActiveStatus === "dj" ? 'active' : ''}`} href="#" onClick={() => setActiveStatus("dj")}>Dj</a>
                                </li>
                                <li className="nav-item">
                                    <a className={`nav-link mx-lg-2 ${ActiveStatus === "makeup" ? 'active' : ''}`} href="#" onClick={() => setActiveStatus("makeup")}>MakeUp</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            {ActiveStatus === "user" && <div className="container">
                <div className="row users">
                    {users && users.map((user, index) => (
                        <div className="col-12 col-md-6 col-lg-4 mt-4 user-section" key={user.id}>
                            <div className="single-user">
                                <div className="user-image">
                                    <img src={logo} alt="" />
                                </div>
                                <div className="username">
                                    <h2 className='user-name'>{user.username}</h2>
                                </div>
                                <div className="email">
                                    <h2 className='user-email'><span className='username-span'>Email: </span>{user.email}</h2>
                                </div>
                                <div className="password">
                                    <h2 className='user-password'><span className='password-span'>Password: </span>{user.password}</h2>
                                </div>
                                <div className="delete">
                                    <button className='delete-btn' onClick={() => { deleteUser(user.id) }}>delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}

            {ActiveStatus === "gallery" && (
                <div className="add-image-gallery">
                    <div className="container">
                        <div className="main-content">
                            <div className="addimage-form">
                                <div className="addimage-form-group">
                                    <input type="file" name="image" id="image" onChange={addImage} required/>
                                </div>
                                <div className="addimage-form-group">
                                    <button className='image-upload-btn' onClick={UploadImage}>Upload</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="gallery-images">
                            <div className="row">
                                {galleryImages != null && galleryImages.map((item, index) => (
                                    <div className="col-4 single-image" key={index}>
                                        <div className="images-img">
                                            <img src={`/src/Gallery_Images/${item.image}`} alt="" />
                                        </div>
                                        <div className="button">
                                            <button className='image-delete-button' onClick={() => { deleteImage(item.id) }}>delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {ActiveStatus === "stage decoration" && (
                <div className="stage-decoration">
                    <div className="container">
                        <div className="main-content sd">
                            <div className="addimage-form">
                                <div className="addimage-form-group">
                                    <input type="file" ref={fileInputRef} className='addimage-input' multiple onChange={handleFileInputChange} style={{ display: 'none' }} required />
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
                                    <input type="text" name="price" id="price" className='addimage-input' placeholder='Price' required/>
                                </div>
                                <div className="addimage-form-group">
                                    <input type="text" name="sd-title" id="sd-title" className='addimage-input' placeholder='Title' required/>
                                </div>
                                <div className="addimage-form-group">
                                    <textarea name="description" id="description" cols="40" rows="5" className='addimage-input' placeholder='Description about package' required/>
                                </div>
                                <div className="addimage-form-group">
                                    <button className='delete-btn' onClick={UploadStageDecoration}> Upload
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {stageDecorationContent &&
                        <div className="row sd-container">
                            {stageDecorationContent.length > 0 && stageDecorationContent.map((item, index) => (
                                <div className="col-12 mt-5 sd-content" key={index}>
                                    <div className="sd-images" key={`images-${index}`}>
                                        {item.images && item.images.map((sdimage, imgIndex) => (
                                            <img src={`/src/StageDecorationImages/${sdimage}`} alt="" key={imgIndex} />
                                        ))}
                                    </div>
                                    {item.images && <div className="sd-title" key={`title-${index}`}>
                                        <h3>{item.title}</h3>
                                    </div>}
                                    <div className="sd-description" key={`description-${index}`}>
                                        <p>{item.description}</p>
                                    </div>
                                    {item.images && <div className="sd-price" key={`price-${index}`}>
                                        <h3>Price: {item.price}</h3>
                                    </div>}
                                    {item.images && <div className="sd-button" key={`buttons-${index}`}>
                                        <button className='sd-btn' onClick={() => { deleteStageDecoration(item.id) }}>DELETE</button>
                                        <button className='sd-btn' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{setEditStageDecorationId(item.id)}} >EDIT</button>
                                    </div>}
                                </div>
                            ))}
                        </div>
                    }

                </div>
            )}


            {ActiveStatus === "dj" && <AdminDJ/>}

            {ActiveStatus === "makeup" && <AdminMakeup/>}





            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                    <input type="text" name="updateprice" id="updataprice" className='' placeholder='Price' />
                                </div>
                                <div className="stagedecoration-edit-model">
                                    <input type="text" name="updatesd-title" id="updatesd-title" className='' placeholder='Title' />
                                </div>
                                <div className="stagedecoration-edit-model">
                                    <textarea name="updatedescription" id="updatedescription" cols="40" rows="5" className='addimage-input' placeholder='Description about package' />
                                </div>
                                <div className="stagedecoration-edit-model">
                                    <button className='update-btn' onClick={updateStageDecoration} > Update
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminDashboard;
