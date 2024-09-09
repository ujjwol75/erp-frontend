<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
import { useState } from "react";
>>>>>>> origin/master
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { menu } from "../../routes/menu";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
<<<<<<< HEAD

  return (
    <MenuItem
      style={{
        color: selected === title ? colors.greenAccent[500] : colors.grey[100],
        backgroundColor: selected === title ? colors.grey[800] : 'transparent', // Background color
      }}
      onClick={() => {
        setSelected(title);
        localStorage.setItem("selectedMenuItem", title); // Store selected item in localStorage
      }}
=======
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
>>>>>>> origin/master
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
<<<<<<< HEAD
  const [selected, setSelected] = useState("");

  useEffect(() => {
    // Retrieve the selected item from localStorage on component mount
    const savedSelection = localStorage.getItem("selectedMenuItem");
    console.log("Saved Selection:", savedSelection); // Debugging
    setSelected(savedSelection || "Dashboard"); // Default to "Dashboard" if no item is saved
  }, []);
=======
  const [selected, setSelected] = useState("Dashboard");
>>>>>>> origin/master

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
<<<<<<< HEAD
          color: colors.greenAccent[500] + " !important", // Ensure color is applied
          backgroundColor: colors.grey[800] + " !important", // Ensure background color is applied
=======
          color: "#6870fa !important",
>>>>>>> origin/master
        },
      }}
      style={{
        height: "100vh",
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMIN
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
<<<<<<< HEAD
                  mBank
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  mBank Admin
=======
                  mbank
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  VP Admin
>>>>>>> origin/master
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
<<<<<<< HEAD
            {menu?.map((items) => (
              <Item
                key={items.id}
                title={items.title}
                to={items.path}
                icon={items.icon}
                selected={selected === items.title}
                setSelected={setSelected}
              />
            ))}
=======
            {menu?.map((items) => {
              return (
                <Item
                  key={items.id}
                  title={items.title}
                  to={items.path}
                  icon={items.icon}
                  selected={selected === items.title}
                  setSelected={setSelected}
                />
              );
            })}
>>>>>>> origin/master
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
