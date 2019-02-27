const jsdom = require('jsdom');
const request = require('request');

const Department = require('./Department');

const { JSDOM } = jsdom;

class College {
  constructor(name, departments, informationUrl, homepageUrl) {
    this.name = name;
    this.departments = departments;
    this.informationUrl = informationUrl;
    this.homepageUrl = homepageUrl;
  }

  static from(element) {
    return new College(
      element.querySelector('.college_head h3').textContent,
      Array.from(element.querySelectorAll('.college_lineup li a')).map(itemElement => Department.from(itemElement)),
      `http://www.inha.ac.kr${element.querySelector('.college_more a').href}`,
      `http://www.inha.ac.kr${element.querySelector('.college_homepage a').href}`,
    );
  }

  getInformation() {
    const { name, informationUrl, homepageUrl } = this;
    return new Promise((resolve, reject) => {
      request(informationUrl, (err, httpResponse, body) => {
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
              homepage: homepageUrl,
            });
          } else if (metadata.length === 2) {
            const [telephone, location] = metadata;
            resolve({
              name,
              description: document.querySelector('.college_h3_text').textContent,
              telephone: telephone.textContent.replace('TEL : ', '').replace(/(\s|\\n|\\t)+/g, ' '),
              fax: null,
              location: location.textContent.replace('위치 : ', '').replace(/(\s|\\n|\\t)+/g, ' ').trim(),
              homepage: homepageUrl,
            });
          } else {
            reject(new Error('Invalid metadata format'));
          }
        }
      });
    });
  }
}

module.exports = College;
