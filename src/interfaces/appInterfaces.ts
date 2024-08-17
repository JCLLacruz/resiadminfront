export interface LocationState {
    from: {
      pathname: string;
    };
  }

  export interface ImageData {
    contentType: string;
    _id: string;
    data: { data: ArrayBuffer };
    src: string;
 }