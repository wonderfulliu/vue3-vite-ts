import JSZip from 'jszip'
declare global {
  interface Window {
    JSZip: JSZip
  }
}
export {}
