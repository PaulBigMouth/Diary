import React from 'react';
import { AddRecordOverlayState } from "./context/addRecordOverlay/AddRecordOverlayState"
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Auth } from './pages/Auth/Auth';
import { Base } from "./pages/Base/Base"
import { Register } from './pages/Register/Register';
import { FirebaseState } from './context/firebase/firebaseState';
import { SettingsOverlayState } from "./context/settingsOverlay/SettingsOverlayState"
import { ViewRecordOverlayState } from './context/viewRecordOverlay/ViewRecordOverlayState';


const App = () => {
  return (
    <FirebaseState>
      <AddRecordOverlayState>
        <SettingsOverlayState>
          <ViewRecordOverlayState>
            <BrowserRouter>
              <Switch>
                <Route path="/" exact component={Auth} />
                <Route path="/register" component={Register} />
                <Route path="/base" component={Base} />
              </Switch>
            </BrowserRouter>
          </ViewRecordOverlayState>
        </SettingsOverlayState>
      </AddRecordOverlayState>
    </FirebaseState>
  );
}

export default App;
