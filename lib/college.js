const jsdom = require('jsdom');
const request = require('request');

const colleges = require('../data/colleges');

/** @module college */

const { JSDOM } = jsdom;

/**
 * Returns a matched college data in the DB.
 * @param {string} name
 * @returns {?College}
 */
const find = name => colleges.find(college => college.name === name) || null;

/**
 * Returns all college data from DB.
 * @returns {Array.<College>}
 */
const getAll = () => colleges;

/**
 * Returns the college information.
 * @async
 * @param {College} college
 * @returns {Promise.<Informaion>}
 */
const getInformation = college => new Promise((resolve, reject) => {
  const { name, pageId, url } = college;
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
          url,
        });
      } else if (metadata.length === 2) {
        const [telephone, location] = metadata;
        resolve({
          name,
          description: document.querySelector('.college_h3_text').textContent,
          telephone: telephone.textContent.replace('TEL : ', '').replace(/(\s|\\n|\\t)+/g, ' '),
          fax: null,
          location: location.textContent.replace('위치 : ', '').replace(/(\s|\\n|\\t)+/g, ' ').trim(),
          url,
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
