import { all, put, takeEvery } from 'redux-saga/effects'
import { storeVendors } from '../actions/vendorActions'
import { FETCH_VENDORS, REGISTER_VENDOR } from '../constants/VendorActionTypes'

function* fetchVendors () {
  let config = {
    method: 'GET',
    headers: new Headers(),
    mode: 'cors',
    cache: 'default'
  }
  let vendors = []
  // '/campaigns'
  yield fetch('http://0.0.0.0:8080/vendors', config)
    .then((response) => response.json())
    .then((vendorsArr) => {
        console.log('yayyyy')
      vendors = vendorsArr
    })
    .catch(err => {
      console.log(err)
    })

  yield put(storeVendors(vendors))
}

function* registerVendor (vendor) {


}

function* campaignSaga () {
  yield all([
    takeEvery(FETCH_VENDORS, fetchVendors),
    registerVendor(REGISTER_VENDOR, registerVendor)
    // takeEvery(REGISTER_USER, registerUser)
  ])
}

export default campaignSaga
