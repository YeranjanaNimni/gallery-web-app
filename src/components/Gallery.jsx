import React, { useState, useEffect } from 'react';
import Image from './Image';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from "axios";
import SelectComponent from './SelectComponent';
import GalleryMode from './GalleryMode';

const Gallery = () => {

      //Api paths
      const apiRoot = "https://api.unsplash.com";
      const accessKey = process.env.REACT_APP_ACCESSKEY;

      //Declaring variables
      const [query, setQuery] = useState("");
      const [searchQ, setSearchQ] = useState(false);
      const [images, setImages] = useState([]);
      const [searchImages, setSearchImages] = useState([]);

      // Filtering Categories
      const [category, setCategory] = useState(0);
      const categoryOptions =
            [
                  { value: 0, text: "All" },
                  { value: "vehicle", text: "Vehicles" },
                  { value: "flowers", text: "Flowers" },
                  { value: "animal", text: "Animals" },
                  { value: "place", text: "Places" },
                  { value: "countries", text: "Country" }
            ];


      const LoadImages = () => {
            axios
                  .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=10`)
                  .then((data) => {
                        setImages([...images, ...data.data]);
                  })
      }

      const LoadSearchImages = (query) => {
            axios
                  .get(`${apiRoot}/search/photos?query=${query}&client_id=${accessKey}&count=20`)
                  .then((data) => {
                        setSearchImages([...data.data.results]);
                  })
      }

      const onClickSearch = () => {
            LoadSearchImages(query);
            setSearchQ(true);
      }

      const handleChangeCategory = (event) => {
            setCategory(event.target.value);
            if (event.target.value === 0) {
                  LoadImages()
            } else {
                  LoadSearchImages(event.target.value)
                  setSearchQ(true);
            }
      };

      useEffect(() => {
            LoadImages();
      }, [])

      
      return (
            <div className='gallery'>
                  <div>
                        <div className='top-bar'>

                              <div className='search-bar'>
                                    <input type="text" onChange={(e) => { setQuery(e.target.value) }} />
                                    <button onClick={onClickSearch}>Search</button>
                              </div>

                              <div className='filters'>
                                    <div>
                                          <GalleryMode />
                                    </div>
                                    <div>
                                          <SelectComponent
                                                options={categoryOptions}
                                                value={category}
                                                label="Category"
                                                onChange={(e) => { handleChangeCategory(e) }}
                                          />
                                    </div>
                              </div>
                        </div>
                        {!searchQ ? (
                              <div>
                                    <InfiniteScroll
                                          dataLength={images.length}
                                          next={LoadImages}
                                          hasMore={true}
                                          loader={<h2>Loading</h2>}
                                    >
                                          <div className='image-container'>
                                                {(images || []).map((img) => (
                                                      <div key={img.id}>
                                                            <Image data={img.urls.thumb} />
                                                      </div>
                                                ))
                                                }
                                          </div>
                                    </InfiniteScroll>
                              </div>
                        ) : (
                              <div>

                                    <div className='image-container'>
                                          {(searchImages || []).map((img) => (
                                                <div className='image' key={img.id}>
                                                      <Image data={img.urls.thumb} />
                                                </div>
                                          ))
                                          }
                                    </div>

                              </div>
                        )}
                  </div>
            </div>
      )
}

export default Gallery;

