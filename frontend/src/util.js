// Promisified XHR Request, because I'd like to track upload progress.
// Unfortunately fetch doesn't have that ability. We can do everything else with fetch though.
const XHRPromise = (url, opts = {}, onProgress) => 
  new Promise((accept, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(opts.method || 'get', url);
    for (let k in opts.headers || {}) {
      xhr.setRequestHeader(k, opts.headers[k]);
    }
    xhr.onload = e => accept(e.target.responseText);
    xhr.onerror = reject;
    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = onProgress;
    }
    xhr.send(opts.body);
  });

export {
  XHRPromise,
};
