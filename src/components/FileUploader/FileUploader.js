import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { CssConstant } from '../../assets/constant/constant'
import { makeStyles } from '@mui/styles'
import { Divider, useTheme } from '@mui/material'
import { cupCakeClient } from '../../services'
import { toast } from 'react-toastify'
import { IconX } from '@tabler/icons'

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

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
                src={file}
                style={img}
                key={`file-${index}`}
              />
              {
                props.onRemoveFile &&
                <IconX style={{backgroundColor: 'white', cursor: 'pointer', position: 'absolute', top: 0, right: 0}}
                onClick={() => {
                  props.onRemoveFile(file)
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

const FileUploader = (props) => {
  const { preview, onChange } = props
  const theme = useTheme()
  
  const useStyles = makeStyles(theme => ({
    ...CssConstant(theme)
  }))
  const classes = useStyles()

  const [files, setFiles] = useState([])

  const onRemoveFile = (file) => {
    let fileLst = files.filter(f => f != file)
    setFiles(fileLst)
    onChange(fileLst)
  }

  const onDrop = (acceptedFiles, rejectedFiles, event) => {
    acceptedFiles.forEach(file => {
      cupCakeClient.uploadFile({
        file: file,
        params: {public: true},
        done: (response) => {
          let values = [...files, response.file_url]
          setFiles(values)
          onChange(values)
        },
        error: (error) => {
          toast.error("Upload file error!")
        }
      })
    })
  }

  return (
    <>
      <Dropzone onDrop={onDrop}
        accept={[".png", ".jpg", ".gif", ".jpeg"]}
      >
        {({ getRootProps, getInputProps }) => (
          <section className="container"
            style={{ minWidth: '30vw' }}
          >
            <div {...getRootProps()} className={classes.dropzone}
              style={{
                outline: theme.palette.primary.main,
                borderColor: theme.palette.secondary.main,
                cursor: 'pointer',
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                }
              }}
            >
              <input {...getInputProps()} />
              <p style={{ marginLeft: 10 }}>Click to select files</p>
            </div>
            {
              preview && files.length > 0 &&
              <div>
                <Divider />
                <aside style={thumbsContainer}>
                  <Preview
                    files={files}
                    waiting={waiting}
                    onRemoveFile={onRemoveFile}
                  />
                </aside>
              </div>
            }
          </section>
        )}
      </Dropzone>
    </>
  )
}

export default FileUploader