import React, { useState } from 'react'
import SelectComponent from './SelectComponent'
import { useNavigate } from 'react-router-dom'


const GalleryMode = () => {

      const navigate = useNavigate()

      const [view, setView] = useState(0);

      //Dropdowns options
      const viewOptions =
            [
                  { value: 0, text: "Infinite Scroll" },
                  { value: 1, text: "Pagination" }
            ];

      const handleChangeView = (event) => {
            setView(event.target.value);
            if (event.target.value === 0) {
                  navigate({ pathname: '/gallery' })
            } else {
                  navigate({ pathname: '/pagination' })
            }
      };

      return (
            <div>
                  <div>
                        <SelectComponent
                              options={viewOptions}
                              value={view}
                              label="View"
                              onChange={(e) => { handleChangeView(e) }}
                        />
                  </div>
            </div>
      )
}

export default GalleryMode