// const file = document.getElementById("file").files[0];

const errorAlert = '<div class="alert alert-danger"><strong>Parse Error!</strong><br />Check console for error logs<br /><br /><strong>Note:</strong><br />This is using the fetch API to retrieve markdown files.<br />i.e. to say you have to host this web page.</div>'

const printButton = document.getElementById('print-btn');

(() => {
  document.getElementById("input").addEventListener("change", () => {
    printButton.disabled = true;
    const reader = new FileReader();
    reader.readAsText(input.files[0]);

    reader.onload = () => {
      try {
        document.title = input.files[0].name;
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
  print(inputString);

  var allLinks = contentDiv.getElementsByTagName('a');
  allLinks = allLinks ? allLinks : [];
  Array.prototype.map.call(allLinks, addTargetBlank);

  var headingsH1 = contentDiv.getElementsByTagName('h1');
  headingsH1 = headingsH1 ? headingsH1 : [];
  Array.prototype.map.call(headingsH1, changeToHref);

  var headingsH2 = contentDiv.getElementsByTagName('h2');
  headingsH2 = headingsH2 ? headingsH2 : [];
  Array.prototype.map.call(headingsH2, changeToHref);

  var headingsH3 = contentDiv.getElementsByTagName('h3');
  headingsH3 = headingsH3 ? headingsH3 : [];
  Array.prototype.map.call(headingsH3, changeToHref);

  document.title = (document.querySelector('h1') !== null) ? document.querySelector('h1').innerText : 'LIMXINGZHI - Markdown Viewer';

  printButton.disabled = false;
}

const print = (stringInput) => {
  stringInput = marked.parse(stringInput);
  contentDiv.innerHTML = stringInput;
  return stringInput;
}

const changeToHref = (htmlNode) => {
  const innerHTML = htmlNode.innerHTML;
  htmlNode.innerHTML = '<a href="#' + htmlNode.id + '">' + innerHTML + '<i class="fas fa-link noprint"></i></a>';
}

const addTargetBlank = (htmlNode) => {
  htmlNode.target="_blank";
}
