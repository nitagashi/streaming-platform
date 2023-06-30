import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { Menu } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export default function MobileHeader(props) {
    const [paths, setPaths] = React.useState([]);
    React.useEffect(() => {
        setPaths(props.paths)
    }, [])
    const [state, setState] = React.useState({
        bottom: false
    });

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, ['bottom']: open });
    };

    return (
        <div>
            <IconButton onClick={toggleDrawer(true)}>
                <Menu htmlColor='white' />
            </IconButton>
            <Drawer
                anchor={'bottom'}
                open={state['bottom']}
                onClose={toggleDrawer(false)}
            ><Box
                className='MobileHeader'
                sx={{ width: 'auto' }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                    <List>
                        {/* {
                            isAdmin ?
                                <Link className="noStyle" to="/Dashboard/Home">
                                    <ListItem key={paths.path} disablePadding>
                                        <ListItemButton>
                                            Dashboard
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                                : ''
                        } */}
                        {paths.map((path) => (
                            <Link className="noStyle" to={path.route} key={path.route}>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary={path.name} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </div>
    );
}