import React from 'react';

class Bottom extends React.Component {
  state = {};

  componentWillMount() {

  }

  render() {
    return (
      <div className="bottom align-center">
        <div className="main">
        	<span className="phoneL">Nomor telepon layanan pelanggan</span>
          <span className="phoneR">
            <a href="tel:02130033358" className="phone"><b>(021) 3003 3358</b></a>
          </span>
        </div>
      </div>
    );
  }
}

export default Bottom;
