import React from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

export default function EditButton(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  var id = props.id;

  //handle option button click
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //get entry to be edited & send to parent
  const handleEdit = ()=>{
    props.toEdit(id)
    handleClose();
  }

  //props pass to parent
  const handleDelete = ()=>{
    props.toDelete(id)
    handleClose();
  }

  //close option button
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
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
}
