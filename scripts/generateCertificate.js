const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const argv = require('minimist')(process.argv.slice(2));

async function render(data){
  const templatePath = path.join(__dirname, '..', 'templates', 'certificate.html');
  let html = fs.readFileSync(templatePath, 'utf8');
  html = html.replace('{{FULL_NAME}}', data.name || '')
             .replace('{{COURSE_TITLE}}', data.course || '')
             .replace('{{ISSUED_AT}}', data.issued_at || new Date().toLocaleDateString())
             .replace('{{VERIF_CODE}}', data.verif_code || '')
             .replace('{{LOGO_URL}}', data.logo || '');
  const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0'});
  const out = data.out || './out/certificate.pdf';
  await page.pdf({ path: out, format: 'A4', printBackground: true });
  await browser.close();
  console.log('PDF generado en', out);
}

render({
  name: argv.name,
  course: argv.course,
  issued_at: argv.issued_at,
  verif_code: argv.verif,
  logo: argv.logo,
  out: argv.out
});
