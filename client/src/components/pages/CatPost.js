import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Rating } from 'react-simple-star-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';


export default function CatPost() {
  const [cat, setCat] = useState({});
  const [images, setImages] = useState([]);
  
  const params = useParams();
  const navigate = useNavigate();
  
  async function handleAdoption() {
    await axios.post(process.env.REACT_APP_SERVER_URL+`/api/add_interest/`, {"id": cat.id, "owner": cat.owner} ,{headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token") } }).then(res => {console.log(res); navigate('/perfil')})
  }
  
  useEffect(() => {
    async function getCat() {
      await axios.get(process.env.REACT_APP_SERVER_URL+`/api/animals/${params.id}`)
      .then(res => {setImages(res.data.images); setCat(res.data)}  );
    }
    getCat();
  }, [params.id]);

  return (
      <>
    <Navbar />  
    <div style={{backgroundColor: "#222222"}} className='container-fluid d-flex flex-column justify-content-center w-100 min-vh-100'>
        <div className='d-flex flex-column flex-lg-row align-items-center pt-3 pt-md-3 pt-lg-0'>
          <div id="carousel-pet" className="carousel slide w-100 h-100 w-md-75 w-lg-75" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    {images.map((img, i) => {
                      return (
                        <button key={`indicator-${i}`} type="button" data-bs-target="#carousel-pet" data-bs-slide-to={i} className="active"
                        aria-current="true" aria-label={`Slide ${i+1}`}></button>
                        )
                      })
                    }
                </div>
                <div className="carousel-inner">
                    {(images.length > 0) ? images.map((img, index) => {
                      if (index === 0) {
                          return (
                            <div className="carousel-item active" key={`item-${index}`}>
                              <div style={{height:"600px"}} className='w-100 d-flex align-items-center'>
                                <img style={{width: "90%"}} className="d-block h-100 w-md-75 w-lg-50 m-auto" src={img.url} key={`image-${index}`} alt="animal"/>
                              </div>
                            </div> 
                          )
                        } else {
                          return(
                            <div className="carousel-item" key={`item-${index}`}>
                              <div style={{height:"600px"}} className='w-100 d-flex align-items-center'>
                                <img key={`image-${index}`} style={{width: "90%"}} className="d-block h-100 w-md-75 w-lg-50 m-auto" src={img.url} alt="animal"/>
                              </div>
                            </div>
                          )
                        }
                    }) : 
                      <div className="carousel-item active">
                          <div style={{height:"600px"}} className='w-100 d-flex align-items-center'>
                            <img style={{width: "70%"}} className="d-block h-100 w-md-75 w-lg-50 m-auto" src={`${process.env.PUBLIC_URL}/assets/images/nophotogato.png`} alt="animal"/>
                          </div>
                      </div> 
                    }
                </div>
                    
                <button className="carousel-control-prev" type="button" data-bs-target="#carousel-pet"
                    data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carousel-pet"
                    data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
        </div>

            <div className='text-white m-auto px-2 w-100 d-flex flex-column justify-content-md-center h-100'>
              
              <h1 className='display-4 text-center py-2 mb-1'>{cat.name}</h1>
              <p className='fs-4 mb-2'>Como ele é: {cat.details}</p>
              <p className='fs-4 mb-2'>Idade: {cat.years} anos e {cat.months} meses.</p> 
              {(cat.published_date) ?
              <p className='fs-4 mb-2'>Publicado em: {cat.published_date.substring(0, 10).split('-').reverse().join("/")}</p> : ""}
             
              <div className='mb-1 fs-5'>
                Fofinho: <Rating ratingValue={cat.cute_rating} readonly emptyIcon={<FontAwesomeIcon icon={faPaw} />} fullIcon={<FontAwesomeIcon icon={faPaw} />}  />
              </div>
              <div className='mb-2 fs-5'>
                  Brincalhão: <Rating  ratingValue={cat.playful_rating} readonly emptyIcon={<FontAwesomeIcon icon={faPaw} />} fullIcon={<FontAwesomeIcon icon={faPaw} />} />
              </div>
              <div className='mb-3 fs-5'>
                  Carinhoso: <Rating ratingValue={cat.kind_rating} readonly emptyIcon={<FontAwesomeIcon icon={faPaw} />} fullIcon={<FontAwesomeIcon icon={faPaw} />}  />
              </div>
              <div className='d-flex justify-content-center'>
              {(sessionStorage.getItem("token"))?
                <button className='btn btn-outline-warning w-auto my-2' onClick={handleAdoption}>Quero adotar</button> :
                <Link to="/login"><button className='btn btn-outline-warning w-auto my-3'>Faça login para adotar</button></Link>
              }
              </div>
            </div>
        </div>
    </div>
    </>
  )
}