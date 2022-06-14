import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginScreen from './screens/Login'
import RegisterScreen from './screens/Register'
import { Provider } from 'react-redux'
import configureStore from './store'
import { loadProfile } from './actions/profileAction'
import { useSelector, useDispatch } from 'react-redux'
import { peckPortalClient } from './api'
import AppContext from './AppContext'
import { createBrowserHistory } from 'history'
import PageNotFound from './screens/404'
import { ThemeProvider } from '@mui/material/styles'
import theme from './themes'
import MainLayout from './layout/MainLayout'
import Account from './screens/Account/account'
import { Order } from './screens/Order'
import { ProductDetail } from './screens/ProductDetail'
import Cookies from 'universal-cookie'
import AdminUser from './screens/AdminUsers'
import AdminProduct from './screens/AdminProducts'
import { AdminVariant } from './screens/AdminVariant'
import { HistoryMoney } from './screens/HistoryMoney'
import LoadMoney from './screens/LoadMoney'
import { HistoryBuying } from './screens/HistoryBuying'
import Ticket from './screens/Ticket'
import { TicketDetail } from './screens/Ticket/components'
import HaiFA from './screens/2FA'

const commonComponents = [
  {
    path: '/account',
    component: Account
  },
  {
    path: '/products/:id',
    component: ProductDetail
  },
  {
    path: '/products',
    component: ProductDetail
  },
  {
    path: '/orders',
    component: Order
  },
  {
    path: '/history/buying',
    component: HistoryBuying
  },
  {
    path: '/history/add_money',
    component: HistoryMoney
  },
  {
    path: '/load_money',
    component: LoadMoney
  },
  {
    path: '/my_ticket',
    component: Ticket
  },
  {
    path: '/my_ticket/:id',
    component: TicketDetail
  },
  {
    path: '/tuts',
    component: HaiFA
  },
  {
    path: '/tuts/2fa',
    component: HaiFA
  }
]

const adminComponents = [
  {
    path: '/',
    component: AdminUser
  },
  {
    path: '/admin/users',
    component: AdminUser
  },
  {
    path: '/admin/products',
    component: AdminProduct
  },
  {
    path: '/admin/variants',
    component: AdminVariant
  },
  ...commonComponents
]

const components = [
  {
    path: '/',
    component: ProductDetail
  },
  ...commonComponents
]

const loggerStore = store => next => action => {
  // console.group(action.type)
  // console.info('dispatching', action)
  let result = next(action)
  // console.log('next state', store.getState())
  // console.groupEnd()
  return result
}

const appHistory = createBrowserHistory()

const appStore = configureStore({}, [
  loggerStore
])

const AppInitialize = (props) => {
  const currentUser = useSelector(state => state.currentUser)
  const loadingState = useSelector(state => state.loadingState)
  const dispatch = useDispatch()
  const cookies = new Cookies()

  useEffect(() => {
    if (!currentUser && peckPortalClient.hasToken()) {
      dispatch(loadProfile())
    }
  }, [currentUser])

  if (currentUser && peckPortalClient.hasToken()) {
    return (
      <AppContext.Provider value={{ currentUser }}>
        <props.children
          appReady={true}
          currentUser={currentUser}
          loadingState={loadingState}
        />
      </AppContext.Provider>
    )
  }

  if (!peckPortalClient.hasToken()) {
    return <props.children
      appReady={false}
    />
  }

  if (loadingState.currentUser == 'failed') {
    return <>
      <div>App lỗi</div>
      <a onClick={() => {
        cookies.remove('token')
        window.location.href = '/'
      }} style={{color: 'green', cursor: 'pointer'}}>Quay về trang chủ</a>
    </>
  }

  return <>Loading</>
}

const withUser = (Component, extraProps = {}) => {
  return function (props) {
    const currentUser = useSelector(state => state.currentUser)
    return currentUser ? <Component {...props} {...extraProps} /> : <Navigate to="/" />
  }
}

const withoutUser = (Component, extraProps = {}) => {
  return function (props) {
    let currentUser = useSelector(state => state.currentUser)
    return currentUser ? <Navigate to="/404" /> : <Component {...props} {...extraProps} />
  }
}

const SignInWrapper = withoutUser(LoginScreen, { signin: peckPortalClient.signin })
const SignUpWrapper = withoutUser(RegisterScreen, { signup: peckPortalClient.signup })

const AppProvider = (props) => {

  return (
    <div>
      <Provider store={appStore}>
        <ThemeProvider theme={theme()}>
          <BrowserRouter history={appHistory}>
            <AppInitialize>
              {
                ({ appReady, currentUser, loadingState }) => (
                  <>
                    {
                      appReady == false &&
                      <Routes>
                        <Route exact path='/' element={<SignInWrapper />} />
                        <Route exact path='/login' element={<SignInWrapper />} />
                        <Route exact path='/register' element={<SignUpWrapper />} />
                        <Route path='/404' element={<PageNotFound />} />
                      </Routes>
                    }
                    {
                      (currentUser?.status == 'active' && loadingState?.currentUser == 'success') && 
                      <Routes>
                        <Route element={<MainLayout />} >
                          {
                            (currentUser.admin ? adminComponents : components).map((component, index) => {
                              return <Route key={index} path={component.path} element={
                                <component.component history={appHistory} currentUser={currentUser} />
                              } />
                            })
                          }
                        </Route>
                        <Route path='/404' element={<PageNotFound />} />
                        <Route path="*" element={<Navigate to="/404" />} />
                      </Routes>
                    }
                  </>
                )
              }
            </AppInitialize>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </div>
  )
}

export default AppProvider