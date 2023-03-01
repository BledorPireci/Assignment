import React from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from "react-router-dom";
import './mainSidebar.scss'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import {Logout} from "@mui/icons-material";


const drawerWidth = 240;

export default function MainSideBar() {
    const navigate = useNavigate();
    const items = [
        {
            title: "Home",
            icon: <HomeIcon />,
            fn: () => navigate("/main")
        },
        {
            title: "Users",
            icon: <GroupIcon />,
            fn: () => navigate("/user")
        }
    ]

    const profileRoutes = [
        {
            name: "Profile",
            icon: <AccountCircleIcon />,
            fn: () => navigate("/userEdit")
        },
        {
            name: "Logout",
            icon: <Logout />,
        },
    ]


    return (
        <Box sx={{ display: "flex" }} >
            <CssBaseline />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        backgroundColor: '#3f4d67',
                    }
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar disableGutters>
                    <RocketLaunchIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "white", marginLeft: '15px' }} />
                    <Typography
                        className="SparkLogo"
                        onClick={() => {
                            navigate("/");
                        }}
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "white",
                            textDecoration: "none", cursor: "pointer",
                        }}>Sparkly</Typography>
                </Toolbar>
                <List>
                    {items.map(({ title, icon, fn }, index) => (
                        <ListItem key={index} disablePadding onClick={fn}>
                            <ListItemButton sx={{
                                hover: { color: "white" },
                            }}>
                                <ListItemIcon sx={{
                                    color: "white",
                                }}>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={title} sx={{
                                    color: "white",
                                }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {
                        profileRoutes.map(({ name, icon, fn }, index) => {
                            return (<ListItem key={index} disablePadding onClick={fn}>
                                <ListItemButton>
                                    <ListItemIcon sx={{ color: "white" }}>
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText primary={name} sx={{ color: "white" }} />
                                </ListItemButton>
                            </ListItem>)
                        })
                    }
                </List>
            </Drawer>
        </Box>
    );
}

