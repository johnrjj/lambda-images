import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import {} from 'jest'; // that is stupid!!
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { BrowserRouter as Router } from 'react-router-dom';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('tests using enzyme', () => {
  const wrapper = shallow(<App/>);
  expect(wrapper.find(Router)).toHaveLength(1);
});
