import React from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';


export default function EditButton() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
        <Button> 
            <MoreHorizIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Open Menu
            </MoreHorizIcon>
        </Button> 
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={handleClose}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>Delete</MenuItem>
        </Menu>
    </div>
  );
}