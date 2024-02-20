import {Box, Container, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Grid, Button,} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

import { useState } from "react";
function App() {
  const[profile,setProfile]=useState({
    "NameoftheFaculty":"",
    "Designation":"",
    "nameoftheprogram":"",
    "Titleoftheprogram":"",
    "DateFrom":"",
    "DateTo":"",
    "Participation":"",
    "LocationofOrganizaton":"",
    "AmountprovidedbytheHEI":"",
    "UploadFile":""
  })

  const[error,setError]=useState({})

  const myCollect=(eve)=>{
    eve.preventDefault()
    const{name,value}=eve.target
    setProfile((exists)=>{
        return{
            ...exists,
            [name]:value
        }
    })
}

const resetting=()=>{
  setProfile(()=>{
      return{
          "NameoftheFaculty":"",
          "Designation":"",
          "nameoftheprogram":"",
          "Titleoftheprogram":"",
          "DateFrom":"",
          "DateTo":"",
          "Participation":"",
          "LocationofOrganizaton":"",
          "AmountprovidedbytheHEI":"",
          "UploadFile":""
      }
  })
}
// Replace the example code for sending a form submission request with this code inside the existing handleSubmit function

const confirm = async (event) => {
  event.preventDefault();
  const response = await fetch('http://localhost:5000/submit-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profile),
  });

  if (response.ok) {
    const responseData = await response.json();
    console.log(responseData);
    alert('Form submitted successfully');
    resetting();
  } else {
    alert('Form submission failed');
  }
};


const validate=()=>{
  let isError=false;
  const newError={}

  if(!profile.NameoftheFaculty){
    isError=true;
    newError.NameoftheFaculty="Name of the Faculty is required"
  }
  if(!profile.Designation){
    isError=true;
    newError.Designation="Designation is required"
  }
  if(!profile.nameoftheprogram){
    isError=true;
    newError.nameoftheprogram="Name of the Program is required"
  }
  if(!profile.Titleoftheprogram){
    isError=true;
    newError.Titleoftheprogram="Title of the Program is required"
  }
  if(!profile.DateFrom){
    isError=true;
    newError.DateFrom="Date From is required"
  }
  if(!profile.DateTo){
    isError=true;
    newError.DateTo="Date To is required"
  }
  if(!profile.Participation){
    isError=true;
    newError.Participation="Participation is required"
  }
  if(!profile.LocationofOrganizaton){
    isError=true;
    newError.LocationofOrganizaton="Location of Organization is required"
  }
  if(!profile.AmountprovidedbytheHEI){
    isError=true;
    newError.AmountprovidedbytheHEI="Amount provided by the HEI is required"
  }

  setError(newError)
  return isError;
}

const handleSubmit = async (event) => {
  event.preventDefault();

  const err = validate();
  if (!err) {
    try {
      const response = await axios.post('http://localhost:3001/create', profile);
      if (response.status === 200) {
        console.log('Data submitted successfully');
        alert("Information has been successfully submitted");
        resetting(); // Reset the form after successful submission
      } else {
        console.error('Error submitting data:', response.statusText);
        alert("Failed to submit information");
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert("Failed to submit information");
    }
  } else {
    alert('Please fill in all required fields');
  }
};

return (
  <div>
    <div>
    <Container sx={{ paddingTop: '1px', paddingBottom: '1px' }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <div className="shadow-lg rounded-4 p-3" style={{ marginTop: '30px', marginBottom: '30px',backgroundColor:'white' }}>
            <form style={{ marginTop: '20px', marginBottom: '20px' }} onSubmit={handleSubmit}>
              <div className="mb-3 text-center">
                <img  alt="Logo" style={{ maxHeight: 110, marginBottom: 10 }} />
                <Typography variant="h4" sx={{ color: '#32348c' }}><b>EVENT PROPOSAL</b></Typography>
              </div>
              <div>
                <FormControl  variant="filled" fullWidth>
                  <InputLabel id="subTypeLabel">Sub type</InputLabel>
                  <Select
                    labelId="subTypeLabel"
                    id="subType"
                    label="Sub type"
                  >
                    <MenuItem value="DDM">Workshop</MenuItem>
                  </Select>
                </FormControl>
              
                <Typography variant="h6" color="brown" align="center" sx={{ marginTop: 2 }}>
                  <b>[WORKSHOP|SEMINAR|FDPs|SDPs and Participation]</b>
                </Typography>
                
                <TextField label="Name of the Faculty " name="NameoftheFaculty" type="text"
                                      onChange={myCollect}
                                      value={profile.NameoftheFaculty} 
                                      fullWidth sx={{ marginTop: 2 }} 
                                      variant="outlined" error={error.NameoftheFaculty && true}
                                      helperText={error.NameoftheFaculty && error.NameoftheFaculty}
                />
             
                <TextField label="Designation" name="Designation" 
                  value={profile.Designation}
                onChange={myCollect} 
                fullWidth sx={{ marginTop: 2 }} 
                variant="outlined" error={error.Designation && true}
                helperText={error.Designation && error.Designation}
                />
               
                <FormControl fullWidth sx={{ marginTop: 2 }}>
                  <InputLabel  id="NameoftheProgram" name="nameoftheprogram" 
                    value={profile.nameoftheprogram}
                    onChange={myCollect}>Name of the program</InputLabel>
                  <Select
                    labelId="Name of the program"
                    label="Name of the program"
                    id="NameoftheProgram" name="nameoftheprogram" 
                    value={profile.nameoftheprogram}
                    onChange={myCollect}
                    error={error.nameoftheprogram && true}
                    >
                    <MenuItem value="Workshop">Workshop</MenuItem>
                    <MenuItem value="Seminar">Seminar</MenuItem>
                    <MenuItem value="FDP">FDP</MenuItem>
                    <MenuItem value="SDP">SDP</MenuItem>
                    <MenuItem value="STTP">STTP</MenuItem>
                    <MenuItem value="Webinar">Webinar</MenuItem>
                  </Select>
                </FormControl>

                <TextField label="Title of the program " name="Titleoftheprogram" value={profile.Titleoftheprogram}
                onChange={myCollect}  fullWidth sx={{ marginTop: 2 }} variant="outlined"
                error={error.Titleoftheprogram && true}
                helperText={error.Titleoftheprogram && error.Titleoftheprogram}
                />

                <TextField label="Date From" name="DateFrom" type="date" value={profile.DateFrom}
                onChange={myCollect} fullWidth sx={{ marginTop: 2 }} variant="outlined" InputLabelProps={{ shrink: true, }}
                error={error.DateFrom && true}
                helperText={error.DateFrom && error.DateFrom}
                />
                
                <TextField label="Date To" name="DateTo" type="date" value={profile.DateTo}
                onChange={myCollect} fullWidth sx={{ marginTop: 2 }} variant="outlined" InputLabelProps={{ shrink: true, }}
                error={error.DateTo && true}
                helperText={error.DateTo && error.DateTo}
                />

                <FormControl fullWidth sx={{ marginTop: 2 }} >
                  <InputLabel  id="Participation" name="Participation" value={profile.Participation}
                  onChange={myCollect} >Participation</InputLabel>
                  <Select
                    labelId="Participation"
                    id="Participation"
                    label="Participation"
                    name="Participation" value={profile.Participation}
                    onChange={myCollect}
                    error={error.Participation && true}
                    >
                    <MenuItem value="Internal">Internal</MenuItem>
                    <MenuItem value="External">External</MenuItem>
                  </Select>
                </FormControl>
                
                
                <TextField label="Location of Organizaton" name="LocationofOrganizaton"
                value={profile.LocationofOrganizaton}
                  onChange={myCollect} fullWidth sx={{ marginTop: 2 }} variant="outlined"
                  error={error.LocationofOrganizaton && true}
                  helperText={error.LocationofOrganizaton && error.LocationofOrganizaton}
                />

                <TextField label="Amount provided by the HEI" type="number" value={profile.AmountprovidedbytheHEI}
                onChange={myCollect}  name="AmountprovidedbytheHEI" fullWidth sx={{ marginTop: 2 }} variant="outlined"
                error={error.AmountprovidedbytheHEI && true}
                helperText={error.AmountprovidedbytheHEI && error.AmountprovidedbytheHEI}
                />

                <Button
                  variant="contained"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                  htmlFor="upload-file"
                  fullWidth
                  sx={{ marginTop: 2 }}
                >
                  Upload File
                  <input
                    type="file"
                    id="upload-file"
                    name="UploadFile"
                    style={{ display: 'none' }}
                    className='up'
                  />
                </Button>
              </div>
             
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, marginTop: 5 }}>
                <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ flex: 1 }}>Submit</Button>  
               
                <Button variant="contained" color="error" onClick={resetting} sx={{ flex: 1 }}>Clear</Button>
              </Box>
            
            </form>
          </div>
        </Grid>
      </Grid>
    </Container>
  </div>
  </div>
)
}
export default App;
