import React, { useEffect, useState } from 'react'
import AsyncSelect from 'react-select/async';
import { customStyles, makeId } from '../../../utils';
import ProductResource from '../../../resources/Product';

const ProductFilter = (props) => {
  const { value, updateFilters, onDeleteFilter } = props
  const [selecteds, setSelecteds ] = useState([])

  const loadOptions = (inputValue, loadingData) => {
    return loadingData(inputValue)
  };

  useEffect(() => {
    updateFilters({
      name: 'product_ids',
      value: selecteds.map(i => i.id)
    })
  }, [selecteds])

  return (
    <div style={{width: 300}}>
      <AsyncSelect
        className={"MuiFormControl-marginDense"}
        isSearchable
        isMulti
        loadOptions={(inputValue) => loadOptions(inputValue, function loadingData(inputValue) {
          return new Promise(resolve => {
            ProductResource.loader.fetchItems({
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
        placeholder={"Lọc theo sản phẩm"}
        defaultOptions
        getOptionLabel={({ title }) => title}
        getOptionValue={({ id }) => id}
        onChange={(value) => {
          setSelecteds(value)
        }}
        value={selecteds}
        styles={customStyles()}
      />
    </div>
  )
}

export default ProductFilter