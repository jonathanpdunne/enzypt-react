import React, { PureComponent } from 'react'
import styled from 'react-emotion'
import { Circle } from 'rc-progress'
import JSZip from 'jszip'
import axios from 'axios'

import { Div } from '../base-components'

import { API_URL } from '../config'
import { getColor } from '../utilities/utilities'

//====== COMPONENT ======\\

class Uploading extends PureComponent {
  state = {
    uploadPercent: 0,
    color: '#ff71ce',
    zipFile: null,
    zipping: false,
    encryptedZip: null,
    encryptedMeta: null,
    encrypting: false,
    encrypted: false,
    zipIpfsHash: false,
    metaIpfsHash: false,
    savingHashes: false
  }

  componentDidUpdate = () => {
    const {
      zipFile,
      encryptedZip,
      encryptedMeta,
      zipping,
      encrypting,
      encrypted,
      iv,
      uploading,
      zipIpfsHash,
      metaIpfsHash,
      savingHashes
    } = this.state
    const { activeIndex, metadata } = this.props
    if (activeIndex && !zipFile && !zipping) {
      this.setState({ zipping: true })
      this.zipFiles()
    }
    if (zipFile && !encrypting && !encrypted) {
      this.setState({ encrypting: true })
      const metaFile = Buffer.from(JSON.stringify(metadata))
      this.encryptFiles(zipFile, metaFile)
    }
    if (encrypted && encryptedZip && encryptedMeta && !uploading) {
      this.setState({ uploading: true })
      this.uploadFiles(encryptedZip, encryptedMeta)
    }
    if (zipIpfsHash && metaIpfsHash && !savingHashes) {
      this.setState({ savingHashes: true })
      this.uploadHashes(
        zipIpfsHash,
        metaIpfsHash,
        iv,
        metadata.price,
        metadata.sellerEthAddress
      )
      this.props.nextSlide()
    }
  }

  zipFiles = async () => {
    const { files, metadata } = this.props
    const zip = new JSZip()

    const filesArray = files.reduce((arr, fileObj) => {
      const file = fileObj
      const name = fileObj.name

      arr.push({
        fileContents: this.readFile(file),
        fileName: name,
        encryptedFile: null
      })

      return arr
    }, [])

    // @todo - here i would like to NOT create a zip file if it's only going to
    // contain one buffer, instead i would like to encrypt that buffer

    let zipFile
    if (filesArray.length === 1) {
      // no need for a zip //
      zipFile = await filesArray[0].fileContents
    } else {
      // generate zip file //
      const folderName = metadata.name

      filesArray.map(fileObj =>
        zip.folder(folderName).file(fileObj.fileName, fileObj.fileContents)
      )

      zipFile = await zip.generateAsync({ type: 'arraybuffer' })
    }

    this.setState({ zipFile, zipping: false })
  }

  encryptFiles = async (zipFile, metaFile) => {
    const { addMetadata } = this.props

    var cryptoObj = window.crypto || window.msCrypto

    // Initialisation vector
    var iv = cryptoObj.getRandomValues(new Uint8Array(16))

    // Create key
    var key = await cryptoObj.subtle.generateKey(
      { name: 'AES-CBC', length: 256, hash: { name: 'SHA-512' } },
      true,
      ['encrypt', 'decrypt']
    )

    // Encrypt file
    var encryptedZip = await cryptoObj.subtle.encrypt(
      { name: 'AES-CBC', iv },
      key,
      zipFile
    )

    var encryptedMeta = await cryptoObj.subtle.encrypt(
      { name: 'AES-CBC', iv },
      key,
      metaFile
    )

    // Export key
    var dkey = await cryptoObj.subtle.exportKey('jwk', key)
    addMetadata({
      initialisation: iv,
      decryptionKey: dkey
    })

    this.setState({
      iv: iv,
      encryptedZip: encryptedZip,
      encryptedMeta: encryptedMeta,
      encrypting: false,
      encrypted: true
    })
  }

  uploadFiles = async (zipFile, metaFile) => {
    try {
      axios
        .post('https://ipfs.enzypt.io/ipfs/', zipFile, {
          onUploadProgress: e => {
            let percentCompleted = Math.floor((e.loaded * 100) / e.total)
            this.setState({
              uploadPercent: percentCompleted,
              color: getColor(percentCompleted)
            })
          }
        })
        .then(res => {
          this.setState({ zipIpfsHash: res.headers['ipfs-hash'] })
        })
      axios.post('https://ipfs.enzypt.io/ipfs/', metaFile).then(res => {
        this.setState({ metaIpfsHash: res.headers['ipfs-hash'] })
      })
    } catch (e) {
      alert(
        'There was a problem uploading your files, please refresh and try again.',
        { error: e.msg }
      )
    }
  }

  uploadHashes = async (zipHash, metaHash, iv, ethPrice, ethAddress) => {
    const { addMetadata } = this.props
    try {
      axios
        .post(
          API_URL + '/sell',
          JSON.stringify({
            zipFileHash: zipHash,
            metaFileHash: metaHash,
            iv: iv,
            ethPrice: ethPrice === '0' ? 'FREE' : ethPrice,
            ethAddress: ethAddress
          }),
          {
            headers: {
              'content-type': 'application/json'
            }
          }
        )
        .then(res => {
          addMetadata({ uniqueUrl: res.data })
        })
    } catch (e) {
      alert(
        'There was a problem uploading your files, please refresh and try again.',
        { error: e.msg }
      )
    }
  }

  readFile = file => {
    const reader = new FileReader()

    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reader.abort()
        reject(alert(`problem reading file ${file.name}`))
      }

      reader.onload = () => {
        resolve(reader.result)
      }

      reader.readAsArrayBuffer(file)
    })
  }

  render() {
    const { color, uploadPercent } = this.state

    return (
      <Container column height="100%">
        <Circle
          strokeWidth={1}
          strokeColor={color}
          strokeLinecap="round"
          percent={uploadPercent}
        />
        <H2 color={color}>{uploadPercent} %</H2>
      </Container>
    )
  }
}

export default Uploading

//====== STYLED ======\\

const Container = styled(Div)`
  width: 50%;
  height: 100%;
`

const H2 = styled('h2')`
  transition: color 250ms ease-in-out;
  color: ${({ color }) => color};
  position: absolute;
  font-size: 1.66rem;
`
