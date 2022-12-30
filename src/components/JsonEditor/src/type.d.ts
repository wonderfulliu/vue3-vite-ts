import jsonlint from "jsonlint-mod";
declare global {
  interface Window {
    jsonlint: jsonlint
  }
}
export {}
