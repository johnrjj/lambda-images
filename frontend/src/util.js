"use strict";
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
var _this = this;
var XHRPromise = function (url, opts, onProgress) {
    if (opts === void 0) { opts = {}; }
    if (onProgress === void 0) { onProgress = undefined; }
    return new Promise(function (accept, reject) {
        var xhr = new XMLHttpRequest();
        xhr.send();
        xhr.open(opts.method || 'get', url);
        for (var k in opts.headers || {}) {
            xhr.setRequestHeader(k, opts.headers[k]);
        }
        xhr.onload = function (e) { return accept(e.target); };
        xhr.onerror = reject;
        if (xhr.upload && onProgress) {
            xhr.upload.onprogress = onProgress;
        }
        xhr.send(opts.body);
    });
};
exports.XHRPromise = XHRPromise;
var getSignedUrl = function (signUrlEndpoint, fileProps) { return __awaiter(_this, void 0, void 0, function () {
    var type, headers, res, url, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                type = fileProps.type;
                console.log(type);
                headers = new Headers({
                    'Content-Type': type,
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch(signUrlEndpoint, { headers: headers })];
            case 2:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 3:
                url = (_a.sent()).url;
                console.log(url);
                return [2 /*return*/, url];
            case 4:
                e_1 = _a.sent();
                console.log(e_1);
                throw e_1;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getSignedUrl = getSignedUrl;
var generateAlbumSignatures = function (endpoint, images) { return __awaiter(_this, void 0, void 0, function () {
    var res, json, album, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch(endpoint, {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        method: 'POST',
                        body: JSON.stringify(images),
                    })];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                json = _a.sent();
                album = json.album;
                return [2 /*return*/, album];
            case 3:
                e_2 = _a.sent();
                console.error(e_2);
                throw e_2;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.generateAlbumSignatures = generateAlbumSignatures;
// const seriesPromises = (promises, concurrent) => {
//   let results = null;
//   promises = promises.slice();
//   concurrent = concurrent || 1;
//   return new Promise((resolve, reject) => {
//     const next = (result) => {
//       var concurrentPromises = [];
//       var promise;
//       if (!results) {
//         results = [];
//       } else {
//         results = results.concat(result);
//       }
//       if (promises.length) {
//         while (concurrentPromises.length < concurrent && promises.length) {
//           var promise = promises.shift();
//           if (typeof promise === 'function') {
//             promise = promise();
//           }
//           if (!promise || typeof promise.then !== 'function') {
//             promise = Promise.resolve();
//           }
//           concurrentPromises.push(promise);
//         }
//         Promise.all(concurrentPromises)
//           .then(next)
//           .catch(reject);
//       } else {
//         resolve(results);
//       }
//     }
//     next();
//   });
// }
var uploadFile = function (url, file) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, XHRPromise(url, {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/octet-stream',
                    },
                    body: file,
                }, getPercentComplete)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var getPercentComplete = function (_a) {
    var loaded = _a.loaded, total = _a.total, lengthComputable = _a.lengthComputable;
    return lengthComputable ? console.log(loaded / total * 100) : null;
};
