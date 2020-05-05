// Setting Toggling the alerts
const errorAlert = '<div class="alert alert-danger"><strong>Parse Error!</strong><br />Check console for error logs<br /><br /><strong>Note:</strong><br />This is using the fetch API to retrieve markdown files.<br />i.e. to say you have to host this web page.</div>'


// Phantom file name https://davidwalsh.name/prevent-cache
const fileName = "./sample.md?" + Date.now()

fetch(fileName)
  .then(response => response.text())
  .then(response => print(response))
  .then(() => {
    document.title = document.getElementsByTagName('h1')[0].innerText;
  })
  .then(() => {
    const headingsH1 = document.getElementsByTagName('h1');
    Array.prototype.map.call(headingsH1, changeToHref);

    const headingsH2 = document.getElementsByTagName('h2');
    Array.prototype.map.call(headingsH2, changeToHref);

    const headingsH3 = document.getElementsByTagName('h3');
    Array.prototype.map.call(headingsH3, changeToHref);

    jumpToAnchor();
  })
  .catch(error => {
    console.error(error)
    print(errorAlert);
  });

const print = (stringInput) => {
  document.getElementById('content').innerHTML = marked(stringInput)
}

const changeToHref = (htmlNode) => {
  const innerHTML = htmlNode.innerHTML;
  htmlNode.innerHTML = '<a href="#' + htmlNode.id + '"><i class="fas fa-link noprint"></i>' + innerHTML + '</a>';
}

const jumpToAnchor = () => {
  if (location.hash)
    document.getElementById(location.hash.slice(1)).getElementsByTagName('a')[0].click();
}
