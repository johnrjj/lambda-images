import * as gm from 'gm';

const DEFAULT_MAX_WIDTH: number = 200;
const DEFAULT_MAX_HEIGHT: number = 200;

const loadIntoImageMagick = gm.subClass({ imageMagick: true });

const computeMaxResizeDimensions = (originalHeight: number, originalWidth: number, maxHeight: number, maxWidth: number) => {
  const scalingFactor: number = Math.min(maxWidth / originalWidth, maxHeight, originalHeight);
  const resizedWidth: number = originalWidth * scalingFactor;
  const resizedHeight: number = originalHeight * scalingFactor;
  return {
    width: resizedWidth,
    height: resizedHeight,
  };
};

const getImageDimensions = (imgBuffer: Buffer): Promise<{ height: number; width: number }> => {
  return new Promise((accept, reject) => {
    const image = loadIntoImageMagick(imgBuffer as any);
    image.size((err, size) => {
      return (err)
        ? reject(err)
        : accept({ height: size.height, width: size.width });
    });
  });
}

const getImageDimensionsFromBuffer = (imgBuffer: Buffer): Promise<any> => {
  return new Promise((accept, reject) => {
    const image = gm(imgBuffer);
    image.size((err, size) => {
      return (err)
        ? reject(err)
        : accept({ height: size.height, width: size.width });
    });
  });
}

const resizeImageToMaxDimensions = (imgBuffer: Buffer, maxWidth, maxHeight): Promise<Buffer> => {
  return new Promise((accept, reject) => {
    const image = loadIntoImageMagick(imgBuffer as any);
    image.resize(maxWidth, maxWidth, '>').toBuffer((err, resizedImageBuffer) => {
      return (err) ? reject(err) : accept(resizedImageBuffer);
    });
  });
};

const resizeImage = async (imageBuffer: Buffer, maxHeight = DEFAULT_MAX_HEIGHT, maxWidth = DEFAULT_MAX_WIDTH): Promise<Buffer> => {
  // const metadata = s3ImageObject.Metadata;
  // const imageBuffer: Buffer = s3ImageObject.Body as Buffer;
  console.log(imageBuffer);
  // console.log(s3ImageObject);
  console.log('1');
  // const originalDimensions = await getImageDimensions(imageBuffer);
  console.log('2');
  const resizedImageBuffer: Buffer = await resizeImageToMaxDimensions(imageBuffer, maxWidth, maxHeight);
  console.log('3');
  console.log(resizedImageBuffer);
  // const resizedDimensions = await getImageDimensions(resizedImageBuffer as any);
  console.log('4');

  return resizedImageBuffer;

  // return {
  //   contentType: s3ImageObject.ContentType,
  //   metadata,
  //   buffer: resizedImageBuffer,
  //   originalHeight: originalDimensions.height,
  //   originalWidth: originalDimensions.width,
  //   height: resizedDimensions.height,
  //   width: resizedDimensions.width,
  // }
};

export {
  resizeImage,
  getImageDimensions,
};