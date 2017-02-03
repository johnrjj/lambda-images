"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var React = require("react");
var Radium = require("radium");
var react_router_dom_1 = require("react-router-dom");
require("./App.css");
require("normalize.css");
var DropArea_1 = require("./components/DropArea");
var FullViewportModal_1 = require("./components/FullViewportModal");
var AlbumPage_1 = require("./containers/AlbumPage");
var ImagePage_1 = require("./containers/ImagePage");
var util_1 = require("./util");
var generateSignedUrls = function (files) {
    files.forEach(function (file) {
        var size = file.size, type = file.type, name = file.name;
    });
};
var getTotalFileSize = function (files) {
    return files.reduce(function (accum, file) { return accum + file.size; }, 0);
};
var styles = {
    input: {
        backgroundColor: 'inherit',
        border: 'none',
        boxShadow: 'none',
        ':focus': {
            outline: 'none',
            borderBottom: '1px solid black',
        },
        after: {
            outline: 'none',
            borderBottom: 'none',
        },
    },
};
;
var DropPic = (function (_super) {
    __extends(DropPic, _super);
    function DropPic(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            showModal: false,
            uploading: false,
            files: null,
        };
        _this.toggleModal = _this.toggleModal.bind(_this);
        _this.handleDrop = _this.handleDrop.bind(_this);
        return _this;
    }
    DropPic.prototype.toggleModal = function () {
        this.setState({ showModal: !this.state.showModal });
    };
    DropPic.prototype.handleDrop = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, files, types, items, postFiles, _loop_1, i, filesMetadata, album, url, images, push;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.toggleModal();
                        _a = e.dataTransfer, files = _a.files, types = _a.types, items = _a.items;
                        postFiles = Array.prototype.slice.call(files);
                        _loop_1 = function (i) {
                            var file = files[i];
                            var reader = new FileReader();
                            var url_1 = reader.readAsDataURL(file);
                            reader.onloadend = function (e) {
                                var files = _this.state.files;
                                _this.setState(function (prevState, props) {
                                    var files = prevState.files;
                                    files[i].previewUrl = reader.result;
                                    return { files: files };
                                });
                            };
                        };
                        for (i = 0; i < postFiles.length || 0; i++) {
                            _loop_1(i);
                        }
                        this.setState({ files: postFiles });
                        filesMetadata = postFiles.map(function (_a) {
                            var name = _a.name, size = _a.size, type = _a.type;
                            return ({
                                name: name,
                                size: size,
                                type: type,
                            });
                        });
                        return [4 /*yield*/, util_1.generateAlbumSignatures('https://up08ep1b3j.execute-api.us-east-1.amazonaws.com/dev/generateAlbum', filesMetadata)];
                    case 1:
                        album = _b.sent();
                        url = album.url, images = album.images;
                        console.log(getTotalFileSize(filesMetadata));
                        console.log(url, images);
                        this.setState({ uploading: true });
                        push = this.props.push;
                        push("/a/" + url);
                        console.log('but i can keep executing!');
                        return [2 /*return*/];
                }
            });
        });
    };
    DropPic.prototype.render = function () {
        return (<DropArea_1.default onDragEnter={this.toggleModal} onDragLeave={this.toggleModal} onDrop={this.handleDrop}>
        <FullViewportModal_1.default hide={!this.state.showModal}>
          <div>Upload a file</div>
        </FullViewportModal_1.default>
        <input type="text" value="hey" onChange={function () { }} style={styles.input}/>
        <react_router_dom_1.Route path="/a/:id" component={AlbumPage_1.default}/>
        <react_router_dom_1.Route path="/:id" exact component={ImagePage_1.default}/>
        {this.state.files
            ? this.state.files.map(function (file) { return (<img key={file.name} src={file.previewUrl}/>); })
            : null}
      </DropArea_1.default>);
    };
    return DropPic;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_router_dom_1.withRouter(Radium(DropPic));
