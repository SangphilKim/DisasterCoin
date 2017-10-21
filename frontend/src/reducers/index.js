import NavigationReducer from './NavigationReducer'
import userReducer from './userReducer'
import vendorReducer from './vendorReducer'
import campaignsReducer from './campaignsReducer'
import loansReducer from './loansReducer'
import userCampaignReducer from './userCampaignReducer'
// import profileReducer from './profileReducer'
import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

const Nemo = combineReducers({
  navigation: NavigationReducer,
  // profiles: profileReducer,
  user: userReducer,
  router: routerReducer,
  campaigns: campaignsReducer,
  vendors: vendorReducer,
  loans: loansReducer,
  campaign: campaignsReducer,
  createdCampaigns: userCampaignReducer,
  donatedCampaigns: userCampaignReducer
})

export default Nemo
