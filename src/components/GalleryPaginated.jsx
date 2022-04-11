import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Image from './Image';
import axios from "axios";
import SelectComponent from './SelectComponent';
import GalleryMode from './GalleryMode';

const GalleryPaginated = () => {

      //Api paths
      const apiRoot = "https://api.unsplash.com";
      const accessKey = process.env.REACT_APP_ACCESSKEY;

      //Declaring variables
      const [page, setPage] = React.useState(1);
      const [query, setQuery] = useState("");
      const [searchQ, setSearchQ] = useState(false);
      const [images, setImages] = useState([]);
      const [searchImages, setSearchImages] = useState([]);

      // Filtering pagesize
      const [selectedPageCount, setSelectedPageCount] = useState(3);
      const pageSizeOptions =
            [
                  { value: 3, text: "3 Images" },
                  { value: 6, text: "6 Images" },
                  { value: 10, text: "10 Images" },
                  { value: 15, text: "15 Images" },
                  { value: 20, text: "20 Images" },
                  { value: 25, text: "25 Images" }
            ];


      const handleChangePagination = (event, value) => {
            setPage(value);
            if (searchQ) {
                  LoadSearchImages(query);
            } else {
                  LoadImages(selectedPageCount);
            }

      };

      const LoadImages = (count) => {
            axios
                  .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
                  .then((data) => {
                        setImages([...data.data]);
                  })
      }

      const LoadSearchImages = (query) => {
            axios
                  .get(`${apiRoot}/search/photos?page=2&query=${query}&client_id=${accessKey}`)
                  .then((data) => {
                        setSearchImages([...data.data.results]);
                  })
      }

      const onClickSearch = () => {
            LoadSearchImages(query);
            setSearchQ(true);
      }

      const handleChangePageSize = (e) => {
            setSelectedPageCount(e.target.value);
            LoadImages(selectedPageCount);
      }

      useEffect(() => {
            LoadImages(selectedPageCount);
      }, [selectedPageCount])


      return (
            <div>
                  <Stack spacing={2}>
                        <Typography>
                              <div className='gallery'>
                                    <div>
                                          <div className='top-bar'>
                                                <div className='search-bar'>
                                                      <input type="text" onChange={(e) => { setQuery(e.target.value) }} />
                                                      <button onClick={onClickSearch}>Search</button>
                                                </div>
                                                <div className='filters'>
                                                      <GalleryMode />
                                                      <div>
                                                            <SelectComponent
                                                                  options={pageSizeOptions}
                                                                  value={selectedPageCount}
                                                                  label="Page Size"
                                                                  onChange={(e) => { handleChangePageSize(e) }}
                                                            />
                                                      </div>
                                                </div>
                                          </div>
                                          {!searchQ ? (
                                                <div>

                                                      <div className='image-container'>
                                                            {(images || []).map((img) => (
                                                                  <div key={img.id}>
                                                                        <Image data={img.urls.thumb} />
                                                                  </div>
                                                            ))
                                                            }
                                                      </div>
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
                        </Typography>
                        <div className='pagination'>
                              <div>
                                    <p className='page-number'>Page: {page}</p>
                                    <Pagination count={10} page={page} onChange={handleChangePagination} />
                              </div>
                        </div>
                  </Stack>
            </div>
      )
}

export default GalleryPaginated