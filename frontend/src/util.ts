import { Image } from './PicDrop';

// Promisified XHR Request, because I'd like to track upload progress.
// Unfortunately fetch doesn't have that ability. We can do everything else with fetch though.
export interface XHROptions {
  headers?: any;
  method?: string;
  body?: any;
}
const XHRPromise = (url, opts: XHROptions = {}, onProgress = undefined) => new Promise((
  accept,
  reject,
) => {
  const xhr: XMLHttpRequest = new XMLHttpRequest();
  console.log('hello');
  // xhr.send();
  xhr.open(opts.method || 'get', url);
  for (let k in opts.headers || {}) {
    xhr.setRequestHeader(k, opts.headers[k]);
  }
    console.log('hell1o');

  xhr.onload = (e) => accept(e.target);
  xhr.onerror = reject;
    console.log('hello3');

  if (xhr.upload && onProgress) {
    xhr.upload.onprogress = onProgress;
  }
    console.log('hello4');

  xhr.send(opts.body);
});

const getSignedUrl = async (signUrlEndpoint: string, fileProps: Image) => {
  const { type } = fileProps; // mime type
  console.log(type);

  const headers = new Headers({
    'Content-Type': type,
  });

  try {
    const res = await fetch(signUrlEndpoint, { headers });
    const { url } = await res.json();
    console.log(url);
    return url;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const generateAlbumSignatures = async (endpoint: string, images: Array<Image>) => {
  try {
    const res = await fetch(endpoint, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(images),
    });
    const json = await res.json();
    const { album } = json;
    return album;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

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

const uploadFile = (url: string, file: File, progressFn: (e:ProgressEvent) => void) => {
  console.log('uploDING');
  return XHRPromise(
    url,
    {
      method: 'put',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      body: file,
    },
    progressFn,
  );
};

// Needs Auth..
const updateImageDescription = async (endpoint: string, imageKey: string, description: string) => {
  try {
    const res = await fetch(endpoint, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ key: imageKey, description }),
    });
    const json = await res.json();
    const { error } = json;
    return {
      error,
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
};


const getPercentComplete = ({ loaded, total, lengthComputable }) =>
  lengthComputable ? console.log(loaded / total * 100) : null;

export {
  XHRPromise,
  getSignedUrl,
  uploadFile,
  generateAlbumSignatures,
  updateImageDescription,
};
