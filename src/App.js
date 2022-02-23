import "./App.css";
import { Switch, Route, useHistory } from "react-router-dom";
import { NotFound } from "./NotFound";
import { Msg } from "./Msg";
import { useState, Fragment } from "react";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { CharacterList } from "./character";
import { AddCharacters } from "./addCharacters";
import { EditCharacter } from "./editCharacter";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

export default function App() {


  const history = useHistory();

  const [mode, setMode] = useState("dark")
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  // drawer
  const array = [
    {
      name: <div className="drawer-name">Home</div>,
      onClick: "/",
      icon: <HomeIcon />,
    },
    {
      name: <div className="drawer-name">Characters</div>,
      onClick: "/characters",
      icon: <PeopleIcon />,
    },
    {
      name: <div className="drawer-name">Add Characters</div>,
      onClick: "/characters/add",
      icon: <PersonAddAlt1Icon />,
    }
  ];



  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {array.map(({ name, onClick, icon }) => (
          <ListItem
            button
            key={name}
            onClick={() => {
              history.push(onClick);
            }}
          >
            <ListItemText color="success" primary={name} />
            {icon}
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={4} style={{ borderRadius: "0px", minHeight: "100vh" }} >
        <div className="App">

          <AppBar position="static">
            <Toolbar>

              {/* <Button color="inherit" onClick={() => history.push("/")}>Home</Button>

              <Button color="inherit" onClick={() => history.push("/characters")}>characters</Button>

              <Button color="inherit" onClick={() => history.push("/characters/add")}>Add characters</Button> */}
              {["left"].map((anchor) => (
                <Fragment key={anchor}>
                  <Button color="inherit" onClick={toggleDrawer(anchor, true)}>
                    <MenuIcon />
                    Menu
                  </Button>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {list(anchor)}
                  </Drawer>
                </Fragment>
              ))}
              <Button color="inherit"
                style={{ marginLeft: "auto" }}
                startIcon={mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                onClick={() => setMode(mode === "light" ? "dark" : "light")} >
                {mode === "light" ? "dark" : "light"} Mode
              </Button>
            </Toolbar>
          </AppBar>

          <Switch>
            <Route path="/characters/add">
              <div className="character-page ">
                <AddCharacters />
              </div>
            </Route>

            <Route path="/characters/edit/:id">
              <div className="character-page ">
                <EditCharacter />
              </div>
            </Route>

            <Route path="/characters">

              <div className="character-page ">
                <CharacterList />
              </div>
            </Route>

            <Route exact path="/">

              <div className="character-page ">
                < Msg />
              </div>

            </Route>
            <Route path="**"> <NotFound /> </Route>
          </Switch>
        </div>
      </Paper>
    </ThemeProvider>
  );
}

