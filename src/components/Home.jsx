import React from 'react';
import { useState, useEffect } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import pic from '../assets/466744ba25bb6a650bc5b4dfc587628c (1).jpg';
import gallery1 from '../assets/96187e552752a7b38259a7ce77a1616b.jpg';
import gallery2 from '../assets/964c5e55f35c8d7b3a8d2f7e24a5578e.jpg';
import gallery3 from '../assets/a1ab5a11247b19a7af7ff6b6c7c383db.jpg';
import gallery4 from '../assets/stage1.jpg';
import gallery5 from '../assets/stage2.jpg';
import gallery6 from '../assets/stage3.jpg';
import gallery7 from '../assets/dj.jpg';
import gallery8 from '../assets/food.jpg';
import gallery9 from '../assets/DJ1.jpg';
import gallery10 from '../assets/PHOTOGRAPHY.jpg';
import gallery11 from '../assets/STAGED.jpg';
import gallery12 from '../assets/FOOD1.jpg';
import '../cssfolder/Home.css';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';


export const UserContext = React.createContext();
const Home = () => {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    

    const location = useLocation(); // Accessing location object
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (location.state && location.state.value) {
            // Check if state object and value property exist
            const { email, password } = location.state.value; // Destructure email and password from state.value
            setEmail(email); // Set email state
            setPassword(password); // Set password state
        }
    }, [location.state]);

// console.log(email, password);


    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex(prevIndex =>
                prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const counters = document.querySelectorAll('.counter-numbers');

        const options = {
            root: null,
            threshold: 0,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const start = 0;
                    const end = parseInt(target.dataset.target, 10); // Use dataset attribute instead of innerText
                    const duration = 700; // 700 milliseconds

                    let startTime = null;

                    const step = timestamp => {
                        if (!startTime) startTime = timestamp;
                        const progress = timestamp - startTime;
                        const percentage = Math.min(progress / duration, 1);

                        // Update counter value using state
                        target.innerText = Math.floor(percentage * (end - start) + start);

                        if (percentage < 1) {
                            requestAnimationFrame(step);
                        }
                    };

                    requestAnimationFrame(step);
                }
            });
        }, options);

        counters.forEach(counter => {
            observer.observe(counter);
        });

        return () => observer.disconnect(); // Disconnect observer on unmount
    }, []); // Empty dependency array to run once on mount

    const imageUrls = [
        { gal1: gallery1 },
        { gal1: gallery2 },
        { gal1: gallery6 },
        { gal1: gallery7 },
        { gal1: gallery8 },
    ];

    // Function to handle click event
    const handleClick = e => {
        if (!e.target.closest('.item')) return;
        let hero = document.querySelector('div[data-pos="0"]');
        let target = e.target.parentElement;
        [target.dataset.pos, hero.dataset.pos] = [hero.dataset.pos, target.dataset.pos];
    };
    const handleServiceClick = () => {
        const ourServiceSection = document.getElementById('our_service');
        if (ourServiceSection) {
            ourServiceSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
        
    const handleAboutUsClick = () => {
        const ourAboutSection = document.getElementById('about_us');
        if (ourAboutSection) {
            ourAboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    const handleGalleryClick = () => {
        const gallerySection = document.getElementById('gallery_section');
        if (gallerySection) {
            gallerySection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    const handleContactClick = () => {
        const contactSection = document.getElementById('contact_section');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    
    return (
        <div>
            <UserContext.Provider value={{ email, setEmail, password, setPassword }}>
                <Header />
            </UserContext.Provider>
            <div className="content">
                <img src={pic} alt="alter image" className="homeimage" />
                <span className="tag"> To get the full value of joy you must have someone to divide it with.</span>
            </div>
            <div className="our_service" id='our_service'>
                <h1 className='our_service_h1 mb-5 mb-md-4 mb-lg-5'>What We Do?</h1>
                <div className="tcontainer">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-lg-3">
                            <div className="main">
                                <div className="service">
                                    <div className="service-logo">
                                        <img src={gallery12} alt="Android Logo" />
                                    </div>

                                    <h4 className='service_h4'>FOOD</h4>
                                    <p className='service_p'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat molestiae ducimus laborum voluptate quisquam adipisci aut tempore cum iste nesciunt repudiandae sapiente, et suscipit.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3">
                            <div className="main">
                                <div className="service">
                                    <div className="service-logo">
                                        <img src={gallery9} alt="Android Logo" />
                                    </div>
                                    <h4 className='service_h4'>DJ</h4>
                                    <p className='service_p'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat molestiae ducimus laborum voluptate quisquam adipisci aut tempore cum iste nesciunt repudiandae sapiente, et suscipit.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12  col-sm-6 col-lg-3">
                            <div className="main">
                                <div className="service">
                                    <div className="service-logo">
                                        <img src={gallery11} alt="Android Logo" />
                                    </div>
                                    <h4 className='service_h4'>DECORATION</h4>
                                    <p className='service_p'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat molestiae ducimus laborum voluptate quisquam adipisci aut tempore cum iste nesciunt repudiandae sapiente, et suscipit.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-12  col-sm-6 col-lg-3">
                            <div className="main">
                                <div className="service">
                                    <div className="service-logo">
                                        <img src={gallery10} alt="Geography Logo" />
                                    </div>
                                    <h4 className='service_h4'>PHOTOGRAPHY</h4>
                                    <p className='service_p'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat molestiae ducimus laborum voluptate quisquam adipisci aut tempore cum iste nesciunt repudiandae sapiente, et suscipit.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="about_us" id='about_us'>
                <div className="maintt">
                    <div className="about_us_content">
                        <div className="aboutsectionimg">
                            <img src={imageUrls[currentImageIndex].gal1} alt="Apple Logo" />
                        </div>
                    </div>
                </div>
                <div className='about_us_text'>
                    <div className="about_us_head">
                        <h2 className='about_us_h2'>who we are</h2>
                        <p className='about_us_p'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis odit eius tempore molestias accusantium laborum aliquam quos veritatis necessitatibus! Pariatur doloremque provident, voluptas quis vel ut. Soluta in repellendus eius.</p>

                        <div className="btn btn-primary mt-5">view more</div>
                    </div>
                </div>
            </div>


            <div className="our_top_heading">
                <h1 className='our_top_heading_head'>how we best</h1>
            </div>
            <div className="top-content">
                <div id="grid">
                    <div className="left"></div>
                    <div className="middle"></div>
                    <div className="right"></div>
                </div>
                <div className="top-text">
                    <p className='top-text-p'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima, dolor. Qui non, ad sequi, praesentium exercitationem beatae est ipsa autem incidunt quis ea accusamus rem Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi animi voluptates quasi debitis quisquam minima neque similique mollitia. Vero beatae voluptatem corrupti rem quaerat repellat quae earum nam, ab fuga! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum velit officia labore sapiente rem dolorum dicta dolore voluptatem tempore itaque, blanditiis quam accusamus ipsa excepturi, natus temporibus fuga necessitatibus. Debitis? voluptatum velit ullam obcaecati totam?</p>
                </div>
            </div>




            <div className="client_count">
    <div className=" client_content d-flex">
        <div>
            <h2 className="counter-numbers" data-target="200">200</h2>
            <p>CLIENTS</p>
        </div>
        <div>
            <h2 className="counter-numbers" data-target="600">600</h2>
            <p>PROJECTS</p>
        </div>
        <div>
            <h2 className="counter-numbers" data-target="500">500</h2>
            <p>project completed</p>
        </div>
        <div>
            <h2 className="counter-numbers" data-target="200">200</h2>
            <p>project completed</p>
        </div>
    </div>
</div>


            <div className="gallery_section" id="gallery_section">
                <div className="gallery_content">
                    <h3 className='gallery_h3'>Gallery</h3>
                    <p className='gallery_p'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim, laudantium distinctio et earum, quia magnam rerum tempore qui soluta facere ut! Blanditiis provident voluptatem nesciunt quae repudiandae repellat est rerum.</p>
                    <button className='btn btn-primary' onClick={() => navigate("/Gallery")}>SEE MORE</button>
                </div>
                <div className="gallery_image_section">
                    <article className="gallery">
                        <img src={gallery1} alt="guitar player at concert" className='img1' />
                        <img src={gallery4} alt="duo singing" className='img2' />
                        <img src={gallery5} alt="crowd cheering" className='img3' />
                        <img src={gallery2} alt="singer performing" className='img4' />
                        <img src={gallery8} alt="singer fistbumping crowd" className='img5' />
                        <img src={gallery6} alt="man with a guitar singing" className='img6' />
                        <img src={gallery3} alt="crowd looking at a lighted stage" className='img7' />
                        <img src={gallery7} alt="woman singing on stage" className='img8' />
                    </article>
                </div>
            </div>

            <Footer />
        </div>

    );
}

export default Home;
