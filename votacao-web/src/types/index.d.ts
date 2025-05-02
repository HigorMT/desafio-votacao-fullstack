export {};

declare module 'pdfjs-dist/build/pdf' {
  import pdfjs from 'pdfjs-dist';
  export = pdfjs;
}

declare module 'pdfjs-dist/build/pdf.worker.entry' {
  const workerSrc: string;
  export default workerSrc;
}

declare global {
  interface Window {
    __APP_BASE__?: string;
  }
}
