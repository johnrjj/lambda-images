"use strict";
var React = require("react");
var ReactDOM = require("react-dom");
var App_1 = require("./App");
var enzyme_1 = require("enzyme");
var react_router_dom_1 = require("react-router-dom");
it('renders without crashing', function () {
    var div = document.createElement('div');
    ReactDOM.render(<App_1.default />, div);
});
it('tests using enzyme', function () {
    var wrapper = enzyme_1.shallow(<App_1.default />);
    expect(wrapper.find(react_router_dom_1.BrowserRouter)).toHaveLength(1);
});
