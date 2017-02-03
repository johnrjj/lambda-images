// Promisified XHR Request, because I'd like to track upload progress.
// Unfortunately fetch doesn't have that ability. We can do everything else with fetch though.
const XHRPromise = (url, opts = {}, onProgress) => new Promise((
  accept,
  reject,
) => {
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

const getSignedUrl = async (signUrlEndpoint, fileProps) => {
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

const generateAlbumSignatures = async (endpoint, images) => {
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

const uploadFile = async (url, file) => {
  await XHRPromise(
    url,
    {
      method: 'put',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      body: file,
    },
    getPercentComplete,
  );
};

const getPercentComplete = ({ loaded, total, lengthComputable }) =>
  lengthComputable ? console.log(loaded / total * 100) : null;

export { XHRPromise, getSignedUrl, generateAlbumSignatures };
