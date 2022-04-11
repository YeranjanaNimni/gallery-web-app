import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectComponent = ({ options, value, label, onChange }) => {

      return (
            <div className='filter'>

                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
                        <Select
                              labelId="demo-simple-select-standard-label"
                              value={value}
                              id="demo-simple-select-standard"
                              label="Age"
                              onChange={onChange}
                        >
                              {(options || []).map(({ value, text }) => (
                                    <MenuItem key={value} value={value}>{text}</MenuItem>
                              ))}
                        </Select>
                  </FormControl>

            </div>

      )
}

export default SelectComponent