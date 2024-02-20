import React, { useState } from 'react';
import App from './demo1.js'

import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText,Collapse,Box} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import { Routes, Route, Link, useNavigate } from "react-router-dom";




function Land() {
const [drawerOpen, setDrawerOpen] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);
const [setAFSublistOpen, setSetAFSublistOpen] = useState(false);
const navigate = useNavigate();


const toggleDrawer = () => {
  setDrawerOpen(!drawerOpen);
};

const handleListItemClick = (text,index) => {
  setSelectedItem(text);
  if (text === 'SetAF') {
    setSetAFSublistOpen(!setAFSublistOpen);
    if (index === 19) {
        navigate("/demo2.js");
      } 
    } else {
      navigate("/")
    }
};

const setAFOptions = [
  'Journal Publications',
  'Conference Publications and Presentations',
  'Workshop and Seminar',
  'Tech Talks to be Delivered',
  'Multidisciplinary Lectures',
  'Faculty Guest Talk in Other Institutions',
  'NPTEL Certification',
  'Participation in TASTE',
  'Lecture Visit to Industries/Institution',
  'Seed Money Proposal for Research',
  'Awards at National/International Level',
  'Proposals Submission for Grants',
  'Books,Chapters Authorship',
  'Consultancy and Corporate Training Done for Revenue Generation',
  'Patents',
  'Collaborative Activities with MoU Signed Industries/Institutions',
  'Visits to the Library',
  'Students Motivation for Paper Presentation/Project Submission',
  'Other Contests/Professional Society Membership',
  'Students Field Work/Internship Guidance'
];


return(
<div>
<AppBar position="sticky" sx={{ backgroundColor: 'white' }}>
  <Toolbar>
    <Box sx={{ flexGrow: 1, paddingLeft: 2, paddingRight: 2, paddingTop: 2, paddingBottom: 2 }}> 
      <img  alt="Logo" width="500" height="75" className='col-md-6 col-12' />
    </Box>
    <IconButton
      edge="end"
      color="inherit"
      aria-label="menu"
      onClick={toggleDrawer}
      sx={{ color: 'black' }} // Change icon color to black
    >
      <MenuIcon />
    </IconButton>
  </Toolbar>
</AppBar>

<Drawer
  anchor="right"
  open={drawerOpen}
  onClose={toggleDrawer}
>
<Box sx={{ width: 250 }} role="presentation">
          <List>
            {["ECR" , "SetAF", "SeSTa", "Log Out"].map((text, index) => (
              <React.Fragment key={text}>
                <ListItem button selected={selectedItem === text} onClick={() => handleListItemClick(text,index)}>
                  <ListItemText primary={text} />
                </ListItem>
                {text === "SetAF" && (
                  <Collapse in={setAFSublistOpen}>
                    <List>
                      {setAFOptions.map((option, index) => (
                        <ListItem key={index}>
                          {index === 19 ? (
                            <Link to="/demo2.js" style={{ textDecoration: 'none' }}>
                              <ListItemText primary={option} />
                            </Link>
                          ) : (
                            <Link to="/" style={{ textDecoration: 'none' }}>
                              <ListItemText primary={option} />
                            </Link>
                          )}
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
      <Routes>
        <Route path="/demo2.js" element={<App />} />
      </Routes>
    </div>
  );
}

export default Land;