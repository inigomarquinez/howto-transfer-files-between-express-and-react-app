const fs = require('fs');
const path = require('path');
const { join } = require('path');
const utils = require('util');
const puppeteer = require('puppeteer');

const readFile = utils.promisify(fs.readFile);

const getTemplateHtml = async () => {
  console.log('Loading template file in memory...');
  try {
    const invoicePath = path.resolve(join(__dirname, './template.html'));
    return await readFile(invoicePath, 'utf8');
  } catch (err) {
    return Promise.reject('Could not load html template');
  }
}
const generatePdf = async () => {
  try {
    const html = await getTemplateHtml();

    // headless mode
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // We set the page content as the generated html by handlebars
    await page.setContent(html);
    // We use pdf function to generate the pdf in the same folder as this file.
    // await page.pdf({ path: 'output.pdf', format: 'A4' });
    const pdfBuffer = await page.pdf({ format: 'A4' });

    console.log('pdf buffer');
    console.log(pdfBuffer);
    await browser.close();

    console.log('PDF Generated');
    return pdfBuffer;
  } catch (error) {
    console.error(error);
  }
};

module.exports = generatePdf;
