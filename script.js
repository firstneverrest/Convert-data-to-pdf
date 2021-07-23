document.getElementById('make-pdf').addEventListener('click', makePdf);

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function generateBarCode(text) {
  try {
    var barcode = document.getElementById('barcode');
    JsBarcode('#barcode', text.replace(/\\r/g, ' '), {
      format: 'CODE128',
      width: 0.8,
      height: 45,
      font: 'Sarabun-Regular.ttf',
      fontSize: 8,
      displayValue: true,
    });
    // convert svg (barcode) to svg text
    var s = new XMLSerializer();
    var barcodeSVGText = s.serializeToString(barcode);
    return barcodeSVGText;
  } catch (error) {
    throw new Error('generateBarCode: parameter must be a string');
  }
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
