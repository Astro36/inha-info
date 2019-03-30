const jsdom = require('jsdom');
const request = require('request');

const colleges = require('../data/colleges');

const { JSDOM } = jsdom;

const find = name => colleges.find(college => college.name === name) || null;

const getAll = () => colleges.map(({ name, departments }) => ({ name, departments }));

const getInformation = college => new Promise((resolve, reject) => {
  const { name, pageId } = college;
  request(`http://www.inha.ac.kr/mbshome/mbs/kr/subview.do?id=${pageId}`, (err, httpResponse, body) => {
    if (err) {
      reject(err);
    } else {
      const { document } = new JSDOM(body).window;
      const metadata = document.querySelectorAll('.list_03 li');
      if (metadata.length === 3) {
        const [telephone, fax, location] = metadata;
        resolve({
          name,
          description: document.querySelector('.college_h3_text').textContent,
          telephone: telephone.textContent.replace('TEL : ', '').replace(/(\s|\\n|\\t)+/g, ' '),
          fax: fax.textContent.replace('FAX : ', ''),
          location: location.textContent.replace('위치 : ', '').replace(/(\s|\\n|\\t)+/g, ' ').trim(),
        });
      } else if (metadata.length === 2) {
        const [telephone, location] = metadata;
        resolve({
          name,
          description: document.querySelector('.college_h3_text').textContent,
          telephone: telephone.textContent.replace('TEL : ', '').replace(/(\s|\\n|\\t)+/g, ' '),
          fax: null,
          location: location.textContent.replace('위치 : ', '').replace(/(\s|\\n|\\t)+/g, ' ').trim(),
        });
      } else {
        reject(new Error('Invalid metadata format'));
      }
    }
  });
});

module.exports = {
  find,
  getAll,
  getInformation,
};
