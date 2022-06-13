import { ActionableExceptionHandler } from "./ActionableErrorHandler";
import { DefaultApiErrorHandler } from "./DefaultApiErrorHandler";

const customStyles = (error) => {
  return {
    control: (provided, state) => ({
      ...provided,
      border: error ? '1px solid #fd5749' : '1px solid rgba(0,0,0,.4)',
      backgroundColor: 'transparent !important',
      height: '50px !important',
      minHeight: '40px !important',
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: "none"
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: 'rgba(0, 0, 0, 0.38)',
      fontSize: '14px',
      whiteSpace: "nowrap"
    }),
    menuList: (provided, state) => ({
      ...provided,
      maxHeight: 150
    }),
    menu: (provided, state) => ({
      // none of react-select's styles are passed to <Control />
      // width: 200,
      ...provided,
      zIndex: 1000,
      // bottom: "100%",
      // top: "auto",
    })
  }
}

const productMapping = {
  "bm": "BM",
  "via_xmdn": 'Via XMDT + 902',
  "via_normal": 'Via Thường Live ADS!',
  "via_limit_50": 'Via Limit $50 + $250',
  "clone": 'Clone các loại'
}

const makeId = (length) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'VND',
});

export {
  ActionableExceptionHandler,
  DefaultApiErrorHandler, 
  customStyles,
  makeId,
  productMapping,
  formatter
}