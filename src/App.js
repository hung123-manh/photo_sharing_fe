import "./App.css";

import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from "./components/LoginRegister";

const App = (props) => {
  const [advancedFeatures, setAdvancedFeatures] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogout = async () => {
    await axios.post("/admin/logout");
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginRegister onLoginSuccess={(user) => setCurrentUser(user)} />;
  }

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar
              currentUser={currentUser}
              onLogout={handleLogout}
              advancedFeatures={advancedFeatures}
              setAdvancedFeatures={setAdvancedFeatures}
            />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              <UserList />
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route path="/users/:userId" element={<UserDetail />} />
                <Route
                  path="/photos/:userId"
                  element={<UserPhotos advancedFeatures={advancedFeatures} />}
                />
                <Route path="/users" element={<UserList />} />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
