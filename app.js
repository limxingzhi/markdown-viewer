// const file = document.getElementById("file").files[0];

const errorAlert = '<div class="alert alert-danger"><strong>Parse Error!</strong><br />Check console for error logs<br /><br /><strong>Note:</strong><br />This is using the fetch API to retrieve markdown files.<br />i.e. to say you have to host this web page.</div>'

const input = document.getElementById("input");
const printButton = document.getElementById('print-btn');

(() => {
  document.getElementById("input").addEventListener("change", () => {
    printButton.disabled = true;
    const reader = new FileReader();
    reader.readAsText(input.files[0]);

    reader.onload = () => {
      try {
        startReader(reader.result);
        printButton.disabled = false;
      } catch (exception) {
        document.getElementById('content').innerHTML = errorAlert;
        console.error(exception);
      }
    };
  }, false);
})();

const contentDiv = document.getElementById('content');

const startReader = (inputString) => {

  // Phantom file name https://davidwalsh.name/prevent-cache

  print(inputString);

  const headingsH1 = contentDiv.getElementsByTagName('h1');
  Array.prototype.map.call(headingsH1, changeToHref);

  const headingsH2 = contentDiv.getElementsByTagName('h2');
  Array.prototype.map.call(headingsH2, changeToHref);

  const headingsH3 = contentDiv.getElementsByTagName('h3');
  Array.prototype.map.call(headingsH3, changeToHref);
}

const print = (stringInput) => {
  contentDiv.innerHTML = marked(stringInput)
  document.title = contentDiv.getElementsByTagName('h1')[0].innerText;
}

const changeToHref = (htmlNode) => {
  const innerHTML = htmlNode.innerHTML;
  htmlNode.innerHTML = '<a href="#' + htmlNode.id + '"><i class="fas fa-link noprint"></i>' + innerHTML + '</a>';
}