exports.onClientEntry = () => {
  // Prevent automatic redirect if the canonical path is different to the browser path
  // see https://stackoverflow.com/q/54045341/326574
  window.pagePath = window.location.pathname
}
