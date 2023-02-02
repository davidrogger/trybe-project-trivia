import React, { Component } from 'react';

import { Barricade } from 'phosphor-react';

// Estilos
import '../styles/settings.css';

class Settings extends Component {
  render() {
    return (
      <div className="settings-container">
        <div className="settings-forms">
          <h1 data-testid="settings-title">Settings</h1>
          <Barricade
            className="settings-ico"
            size={ 150 }
          />
          Not Implemented yet
        </div>
      </div>
    );
  }
}
//
export default Settings;
