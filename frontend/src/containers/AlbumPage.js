"use strict";
var React = require("react");
var Radium = require("radium");
var AlbumPage = function (_a) {
    var match = _a.match;
    return (<div>
      <h1>a gallery page, with id of {match.params.id}</h1>
    </div>);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Radium(AlbumPage);
