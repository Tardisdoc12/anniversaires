import React, { Component } from 'react';

class ConvertComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
  }

  handleFileChange = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file);

    try {
      const res = await fetch('http://localhost:3002/upload', {
            method: 'POST',
            body: formData,
        }

      )
      alert(res.data);
    } catch (err) {
      console.error(err);
      alert('Erreur lors du téléchargement du fichier');
    }
  };

  render() {
    return (
      <div className="ConvertComponent">
        <h1>Upload CSV File</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="file" onChange={this.handleFileChange} />
          <button type="submit">Upload</button>
        </form>
      </div>
    );
  }
}

export default ConvertComponent;
