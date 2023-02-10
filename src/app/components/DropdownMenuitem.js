import { useState } from 'react';
import { Menu, Button } from '@mui/material';


export default function DropdownMenuitem(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }
    return (
        <div>
            <Button onClick={handleClick}>
                {props?.children}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}>
            </Menu>
        </div>
    )
}