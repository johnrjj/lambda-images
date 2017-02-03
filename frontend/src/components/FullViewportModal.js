"use strict";
var React = require("react");
var Radium = require("radium");
// todo: make full screen an attribute so modal is reusable.
var styles = {
    fullScreen: {
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        left: 0,
        top: 0,
    },
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: '2px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.2s ease-out',
        zIndex: '1',
    },
    modalContentContainer: {
        backgroundColor: '#45484f',
        width: '680px',
        height: '450px',
        boxShadow: '0 5px 15px 0 rgba(0,0,0,.5)',
        borderRadius: '5px',
        padding: '10rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    hidden: {
        transition: 'opacity 0.25s ease-in',
        opacity: '0',
        zIndex: '-1',
    },
};
var FullViewportModal = function (_a) {
    var children = _a.children, hide = _a.hide;
    return (<div style={[styles.fullScreen, styles.modalContainer, hide && styles.hidden]}>
      <div style={styles.modalContentContainer}>
        {children}
      </div>
    </div>);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Radium(FullViewportModal);
