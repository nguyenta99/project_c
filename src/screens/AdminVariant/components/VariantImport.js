import React, {useState} from 'react'
import { Input, Button, Stack } from '@mui/material'
import ProductResource from '../../../resources/Product'
import AsyncSelect from 'react-select/async';
import { customStyles, makeId } from '../../../utils';

const VariantImport = (props) => {
  const { submitData, handleChange } = props
  const [currentPage, setCurrentPage] = useState(0)
  const [perPage, setPerPage] = useState(25)

  const handleSelectFile = (event) => {
    handleChange('file', event.target.files[0])
  }

  const loadOptions = (inputValue, loadingData) => {
    return loadingData(inputValue)
  };

  return (
    <>
      <Stack direction={'column'} spacing={2}>
        <AsyncSelect
          className={"MuiFormControl-marginDense"}
          isSearchable
          loadOptions={(inputValue) => loadOptions(inputValue, function loadingData(inputValue) {
            return new Promise(resolve => {
              ProductResource.loader.fetchItems({
                paging: { page: (currentPage || 1), perPage: perPage },
                filters: {title: inputValue},
                done: (response) => {
                  resolve(response)
                },
                error: (error) => {
                  resolve([])
                }
              })
            })
          })
          }
          defaultOptions
          getOptionLabel={({ title }) => title}
          getOptionValue={({ id }) => id}
          onChange={(value) => {
            handleChange('kind', value)
          }}
          value={submitData.values.kind || null}
          styles={customStyles()}
        />
        <Button
          variant='contained'
          component="label"
        >
          Select File
          <input
            type="file"
            hidden
            accept='.txt'
            onChange={handleSelectFile}
          />
        </Button>
        {
          submitData.values.file &&
          <div>1 file selected</div>
        }
      </Stack>
    </>
  )
}

export default VariantImport