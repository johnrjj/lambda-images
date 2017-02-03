"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var React = require("react");
var DropArea = function (props) {
    var onDragOver = props.onDragOver, onDragEnter = props.onDragEnter, onDragLeave = props.onDragLeave, onDragEnd = props.onDragEnd, onDrop = props.onDrop, rest = __rest(props, ["onDragOver", "onDragEnter", "onDragLeave", "onDragEnd", "onDrop"]);
    var handleDragOver = function (e) {
        e.preventDefault();
        if (onDragOver) {
            onDragOver(e);
        }
    };
    var handleDragStart = function (e) { };
    var handleDragEnter = function (e) {
        e.preventDefault();
        if (onDragEnter) {
            onDragEnter(e);
        }
    };
    var handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (onDrop) {
            onDrop(e);
        }
    };
    var handleDragLeave = function (e) {
        e.preventDefault();
        if (onDragLeave) {
            onDragLeave(e);
        }
    };
    var handleDragEnd = function (e) {
        e.preventDefault();
        if (onDragEnd) {
            onDragEnd(e);
        }
    };
    return (<div onDragEnter={handleDragEnter} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onDragStart={handleDragStart} {...rest}>
      {props.children}
    </div>);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DropArea;
