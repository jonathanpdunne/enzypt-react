import React, { Component } from 'react'
import styled from 'react-emotion'
import MdClose from 'react-icons/lib/md/close'

import { Div } from '../base-components'
import { Button, HiddenInput, GradientBorderDiv } from '../elements'

import FileIcon from '../assets/icons/FileIcon'
import { fromTop } from '../styles/animations'
import {
  convertFileSize,
  getFileType,
  minimizeFileName
} from '../utilities/utilities'

// ============ COMPONENT ============= \\

class FileDragDrop extends Component {
  state = {
    showFiles: false,
    status: 'inactive',
    filesDisplayed: 10,
    filesTooLarge: false
  }

  static getDerivedStateFromProps = (props, state) => {
    return props.files.length === 0 && state.status === 'success'
      ? { status: 'inactive' }
      : null
  }

  handleDrop = event => {
    event.preventDefault()
    event.stopPropagation()
    const newFiles = Array.from(event.dataTransfer.files)
    if (newFiles.length === 0) return

    this.props.addFiles(newFiles, this.updateTotalFilesize)
    this.setState({
      showFiles: true,
      status: 'success'
    })
  }

  handleChange = event => {
    event.preventDefault()
    event.stopPropagation()
    const newFiles = Array.from(event.target.files)
    if (newFiles.length === 0) return

    this.props.addFiles(newFiles, this.updateTotalFilesize)
    this.setState({ showFiles: true, status: 'success' })
    event.target.value = ''
  }

  updateTotalFilesize = files => {
    const { addMetadata } = this.props

    const totalFileSize = files.reduce((acc, val) => acc + val.size, 0)
    const formattedFileSize = convertFileSize(totalFileSize)
    addMetadata({ totalFileSize: formattedFileSize })
  }

  handleDragEnter = e => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ status: 'active' })
  }

  handleDragLeave = e => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ status: 'inactive' })
  }

  handleDragOver = e => {
    e.preventDefault()
    e.stopPropagation()
  }

  removeFile = name => {
    this.props.removeFile(name, this.updateTotalFilesize)
  }

  nextStage = () => {
    const { nextSlide, files, addMetadata } = this.props
    const totalFileSize = files.reduce((acc, val) => acc + val.size, 0)
    if (totalFileSize / 1000000 > 100) {
      this.setState({ filesTooLarge: true })
      return
    }

    addMetadata({
      files: files.map(f => ({ name: f.name, size: f.size, type: f.type }))
    })

    this.setState({ filesDisplayed: 10, filesTooLarge: false })
    nextSlide()
  }

  render() {
    const { multiple = false, files, ...rest } = this.props
    const { showFiles, status, filesDisplayed, filesTooLarge } = this.state
    const show = files.length > 0

    return (
      <DropZoneContainer
        {...rest}
        column
        status={status}
        onDrop={this.handleDrop}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
        onDragOver={this.handleDragOver}
      >
        <HiddenInput
          type="file"
          name="file"
          id="file"
          onChange={this.handleChange}
          multiple={multiple}
        />

        <ErrorMsg show={filesTooLarge}>
          Files exceed total limit of 100MB, please remove some files before
          proceeding
        </ErrorMsg>
        <Files maxHeight="22rem" show={files.length > 0}>
          {files.length !== 0
            ? files.slice(0, filesDisplayed).map(file => (
                <FileContainer
                  show={showFiles}
                  margin="0.25rem"
                  justify="flex-start"
                  key={`${file.name}${file.size}`}
                  onTouchStart={this.removeFile.bind(null, file.name)}
                >
                  <File fileType={file.type} />
                  <H2 primary>{minimizeFileName(file.name)}</H2>
                  <H2>{convertFileSize(file.size)}</H2>
                  <Cross onClick={this.removeFile.bind(null, file.name)}>
                    x
                  </Cross>
                </FileContainer>
              ))
            : null}
          {files.length > filesDisplayed ? (
            <Button
              onClick={() =>
                this.setState(({ filesDisplayed }) => ({
                  filesDisplayed: filesDisplayed + 10
                }))
              }
            >
              Show more
            </Button>
          ) : null}
        </Files>

        <SelectFilesButton htmlFor="file" more={show}>
          SELECT {show ? 'MORE' : 'FILES'}
        </SelectFilesButton>
        <NextButton show={show} onClick={this.nextStage}>
          NEXT
        </NextButton>
      </DropZoneContainer>
    )
  }
}

export default FileDragDrop

//====== ELEMENTS ======\\

const File = props => {
  return (
    <Div width="2.5rem" color="white">
      <FileIcon />
      <Span>{getFileType(props.fileType)}</Span>
    </Div>
  )
}

// ============ STYLED ============= \\

const DropZoneContainer = styled(GradientBorderDiv)`
  position: relative;
  border: ${({ status, theme }) =>
    status === 'inactive'
      ? `3px dashed ${theme.colors.black}`
      : status === 'active'
        ? `2px solid transparent`
        : status === 'success'
          ? `2px solid ${theme.colors.c1}`
          : `2px solid ${theme.colors.error}`};
  height: 100%;
  box-shadow: none;
  @media (max-width: 1024px) {
    border: none;
    background: transparent;
  }
`

const ErrorMsg = styled('span')`
  position: fixed;
  top: 0.5rem;
  width: ${({ show }) => (show ? '95%' : '0')};
  font-size: 0.8rem;
  opacity: ${({ show }) => (show ? '1' : '0')};
  transition: opacity 250ms ease-in-out 50ms, width 250ms ease-in-out;
  color: ${({ theme }) => theme.colors.error};
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: 4px;
  padding: 0.5rem;
  height: 3rem;
  overflow: hidden;
  z-index: ${({ show }) => (show ? '3' : '-1')};
  text-align: center;
`

const SelectFilesButton = Button.withComponent('label')

const H2 = styled('h2')`
  color: ${({ theme, primary }) =>
    primary ? theme.colors.white : theme.colors.gray};
  margin: 0.5rem;
`

const Files = styled(Div)`
  max-height: 22rem;
  overflow-y: ${({ show }) => (show ? 'scroll' : 'hidden')};
`

const FileContainer = styled(Div)`
  ${({ show }) =>
    show ? `animation: ${fromTop} 1s` : `transform: translateY(-1000px)`};
  padding: 0 0.5rem;
`

const Span = styled('span')`
  position: absolute;
  font-size: 0.8rem;
`

const Cross = styled(MdClose)`
  color: ${({ theme }) => theme.colors.error};
  position: absolute;
  font-size: 1.33rem;
  right: 0;
  top: 0;
  &:hover {
    cursor: pointer;
  }
`

const NextButton = styled(Button)`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  opacity: ${({ show }) => (show ? '1' : '0')};
  width: ${({ show }) => (show ? '5rem' : '0')};
  overflow: hidden;
  transition: opacity 500ms ease-in-out, width 250ms ease-in-out;
`
