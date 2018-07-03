import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import FriendList from './FriendsList'

Enzyme.configure({ adapter: new Adapter() })