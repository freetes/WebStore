const formidable = require('formidable')
const path = require('path')

const form = new formidable.IncomingForm();
form.encoding = 'utf-8';
form.keepExtensions = true;
form.uploadDir = path.join(__dirname, 'public/tmp')

module.exports = form
