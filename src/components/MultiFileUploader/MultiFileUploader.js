import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { cupCakeClient } from '../../services'
import './style.css'
import { IconX } from '@tabler/icons'
import { toast } from 'react-toastify'

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden', 
  position: 'relative'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const Preview = (props) => {
  return (
    <>
      {
        props.files.map((file, index) => (
          <div style={thumb} key={`thumb-${index}`}>
            <div style={thumbInner} key={`thumb-inner-${index}`}>
              <img
                src={file.file_url}
                style={img}
                key={`file-${index}`}
              />
              {
                props.onRemoveFile &&
                <IconX style={{backgroundColor: 'white', cursor: 'pointer', position: 'absolute', top: 0, right: 0}}
                onClick={() => {
                  props.onRemoveFile(file.file_url)
                }}
              />
              }
            </div>
          </div>
        ))
      }
    </>
  )
}

export default class MultiFileUploader extends Component {
  constructor(props) {
    super(props);
    this.upload = this.upload.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.onDrop = this.onDrop.bind(this);

    this.state = {
      selectedFiles: undefined,
      progressInfos: [],
      message: [],
      fileInfos: [],
    };
  }

  upload(idx, file) {
    let _progressInfos = [...this.state.progressInfos];

    cupCakeClient.uploadFile({
      file: file,
      params: { public: true },
      done: (response) => {
        this.setState((prev) => {
          let nextMessage = [
            ...prev.message,
            "Uploaded the file successfully: " + file.name,
          ];
          return {
            message: nextMessage,
          };
        });

        let fileInfos = [...this.state.fileInfos]
        fileInfos.push(response)
        this.setState({ fileInfos },  () => {
          if(this.props.onChange){
            this.props.onChange(fileInfos.map(i => i.file_url))
          }
        })
      },
      error: (error) => {
        _progressInfos[idx].percentage = 0;
        this.setState((prev) => {
          let nextMessage = [
            ...prev.message,
            "Could not upload the file: " + file.name,
          ];
          return {
            progressInfos: _progressInfos,
            message: nextMessage,
          };
        });
        toast.error("Upload file error!")
      },
      progress: (loaded, total) => {
        _progressInfos[idx].percentage = Math.round(
          (100 * loaded) / total
        );
        this.setState({
          _progressInfos,
        });
      }
    })
  }

  uploadFiles() {
    const selectedFiles = this.state.selectedFiles;

    let _progressInfos = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      _progressInfos.push({ percentage: 0, fileName: selectedFiles[i].name });
    }

    this.setState(
      {
        progressInfos: _progressInfos,
        message: [],
      },
      () => {
        for (let i = 0; i < selectedFiles.length; i++) {
          this.upload(i, selectedFiles[i]);
        }
      }
    );
  }

  onDrop(files) {
    if (files.length > 0) {
      this.setState({ selectedFiles: files });
    }
  }

  onRemoveFile = (file) => {
    let fileInfos = this.state.fileInfos.filter(f => f.file_url != file)
    this.setState({ fileInfos }, () => {
      if(this.props.onChange){
        this.props.onChange(fileInfos.map(i => i.file_url))
      }
    })
  }

  render() {
    const { selectedFiles, progressInfos, message, fileInfos } = this.state;

    return (
      <div>
        {progressInfos &&
          progressInfos.map((progressInfo, index) => (
            <div className="mb-2" key={index}>
              <span>{progressInfo.fileName}</span>
              <div className="progress">
                <div
                  className="progress-bar progress-bar-info"
                  role="progressbar"
                  aria-valuenow={progressInfo.percentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: progressInfo.percentage + "%" }}
                >
                  {progressInfo.percentage}%
                </div>
              </div>
            </div>
          ))}

        <div className="my-3">
          <Dropzone onDrop={this.onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  {selectedFiles &&
                    Array.isArray(selectedFiles) &&
                    selectedFiles.length ? (
                    <div className="selected-file">
                      {selectedFiles.length > 3
                        ? `${selectedFiles.length} files`
                        : selectedFiles.map((file) => file.name).join(", ")}
                    </div>
                  ) : (
                    `Drag and drop files here, or click to select files`
                  )}
                </div>
                <aside className="selected-file-wrapper">
                  <button
                    className="btn btn-success"
                    disabled={!selectedFiles}
                    onClick={this.uploadFiles}
                  >
                    Upload
                  </button>
                </aside>
              </section>
            )}
          </Dropzone>
        </div>

        {message.length > 0 && (
          <div className="alert alert-secondary" role="alert">
            <ul>
              {message.map((item, i) => {
                return <li key={i}>{item}</li>;
              })}
            </ul>
          </div>
        )}

        {fileInfos.length > 0 && (
          <Preview
            files={fileInfos}
            onRemoveFile={this.onRemoveFile}
          />
        )}
      </div>
    );
  }
}