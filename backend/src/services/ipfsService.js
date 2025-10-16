const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const dotenv = require('dotenv');

dotenv.config();

class IPFSService {
  constructor() {
    this.provider = process.env.IPFS_PROVIDER || 'pinata';
  }

  async pinFile(filePath, fileName) {
    if (this.provider === 'pinata') {
      return this.pinFileToPinata(filePath, fileName);
    } else if (this.provider === 'infura') {
      return this.pinFileToInfura(filePath, fileName);
    } else {
      throw new Error('Unsupported IPFS provider');
    }
  }

  async pinJSON(jsonData, name) {
    if (this.provider === 'pinata') {
      return this.pinJSONToPinata(jsonData, name);
    } else if (this.provider === 'infura') {
      return this.pinJSONToInfura(jsonData, name);
    } else {
      throw new Error('Unsupported IPFS provider');
    }
  }

  async pinFileToPinata(filePath, fileName) {
    try {
      const formData = new FormData();
      formData.append('file', fs.createReadStream(filePath));
      
      const metadata = JSON.stringify({
        name: fileName,
      });
      formData.append('pinataMetadata', metadata);

      const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${process.env.PINATA_API_KEY}`
        }
      });

      return {
        hash: response.data.IpfsHash,
        url: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`
      };
    } catch (error) {
      console.error('Error pinning file to Pinata:', error);
      throw new Error('Failed to pin file to Pinata');
    }
  }

  async pinJSONToPinata(jsonData, name) {
    try {
      const response = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
        pinataContent: jsonData,
        pinataMetadata: {
          name: name
        }
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.PINATA_API_KEY}`
        }
      });

      return {
        hash: response.data.IpfsHash,
        url: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`
      };
    } catch (error) {
      console.error('Error pinning JSON to Pinata:', error);
      throw new Error('Failed to pin JSON to Pinata');
    }
  }

  async pinFileToInfura(filePath, fileName) {
    try {
      const formData = new FormData();
      formData.append('file', fs.createReadStream(filePath));
      
      const response = await axios.post('https://ipfs.infura.io:5001/api/v0/add', formData, {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        },
        auth: {
          username: process.env.INFURA_PROJECT_ID,
          password: process.env.INFURA_PROJECT_SECRET
        }
      });

      return {
        hash: response.data.Hash,
        url: `https://ipfs.infura.io/ipfs/${response.data.Hash}`
      };
    } catch (error) {
      console.error('Error pinning file to Infura:', error);
      throw new Error('Failed to pin file to Infura');
    }
  }

  async pinJSONToInfura(jsonData, name) {
    try {
      const formData = new FormData();
      formData.append('file', Buffer.from(JSON.stringify(jsonData)), {
        filename: `${name}.json`,
        contentType: 'application/json'
      });
      
      const response = await axios.post('https://ipfs.infura.io:5001/api/v0/add', formData, {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        },
        auth: {
          username: process.env.INFURA_PROJECT_ID,
          password: process.env.INFURA_PROJECT_SECRET
        }
      });

      return {
        hash: response.data.Hash,
        url: `https://ipfs.infura.io/ipfs/${response.data.Hash}`
      };
    } catch (error) {
      console.error('Error pinning JSON to Infura:', error);
      throw new Error('Failed to pin JSON to Infura');
    }
  }
}

module.exports = IPFSService;