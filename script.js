document.getElementById('make-pdf').addEventListener('click', makePdf);

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function makePdf() {
  pdfMake.fonts = {
    Sarabun: {
      normal: 'Sarabun-Regular.ttf',
    },
  };

  var docDefinition = {
    content: [
      {
        text: 'Hello World',
      },
    ],
    defaultStyle: {
      font: 'Sarabun',
      fontSize: 8,
    },
    pageMargins: [25, 40, 20, 20],
  };
  // pdfMake.createPdf(docDefinition).download('BillPayment.pdf');
  pdfMake.createPdf(docDefinition).open();
}
