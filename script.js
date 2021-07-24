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

function getBase64Image(img) {
  try {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL('image/jpeg', 1.0);
    return dataURL;
  } catch (error) {
    throw new Error('getBase64Image: parameter must be an image element');
  }
}

function convertDateToThai(date) {
  try {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);

    const thaiDate = new Date(year, month, day);
    const result = thaiDate.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });

    const firstPart = result.slice(0, result.length - 4);
    const yearPart = 'พ.ศ.' + result.slice(-4);
    return firstPart + yearPart;
  } catch (error) {
    throw new Error('convertDateToThai: parameter must be a string date');
  }
}

function makePdf() {
  pdfMake.fonts = {
    Sarabun: {
      normal: 'Sarabun-Regular.ttf',
    },
  };

  const building = getBase64Image(document.getElementById('building'));

  var docDefinition = {
    content: [
      {
        text: 'Convert Data to PDF',
        style: 'header',
      },
      "Let's Start with simple text, you can add columns, images, table, list and much more!\n\n",
      {
        columns: [
          {
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem. ',
          },
          {
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem. ',
          },
        ],
      },
      "\nStar-sized columns have always equal widths, so if we define 3 of those, it'll look like this (make sure to scroll to the next page, as we have a couple of more examples):\n\n",
      {
        image: building,
        width: 400,
      },
    ],
    defaultStyle: {
      font: 'Sarabun',
      fontSize: 10,
    },
    styles: {
      header: {
        fontSize: 14,
        fontWeight: 600,
      },
    },
    pageMargins: [30, 20, 30, 20],
  };
  // pdfMake.createPdf(docDefinition).download('BillPayment.pdf');
  pdfMake.createPdf(docDefinition).open();
}
