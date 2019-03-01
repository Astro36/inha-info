const jsdom = require('jsdom');
const request = require('request');

const { JSDOM } = jsdom;

class Department {
  constructor(name, informationUrl) {
    this.name = name;
    this.informationUrl = informationUrl;
  }

  static from(element) {
    return new Department(
      element.textContent,
      `http://www.inha.ac.kr${element.href}`,
    );
  }

  getInformation() {
    const { name, informationUrl } = this;
    return new Promise((resolve, reject) => {
      request(informationUrl, (err, httpResponse, body) => {
        if (err) {
          reject(err);
        } else {
          const { document } = new JSDOM(body).window;
          const metadata = document.querySelector('.contact_g').textContent
            .trim()
            .split('\n')
            .map(data => data.split(' : ')[1].trim());
          if (metadata.length === 3) {
            const [telephone, fax, location] = metadata;
            resolve({
              name,
              telephone,
              fax,
              location,
              homepage: document.querySelector('.go_homepage a').href,
            });
          } else {
            reject(new Error('Invalid metadata format'));
          }
        }
      });
    });
  }

  getProfessors() {
    const { informationUrl } = this;
    return new Promise((resolve, reject) => {
      request(informationUrl.replace('introList.do', 'profList.do'), (err, httpResponse, body) => {
        if (err) {
          reject(err);
        } else {
          const { document } = new JSDOM(body).window;
          const professors = Array.from(document.querySelectorAll('.humanList .infoWrap'))
            .map(element => element.querySelector('.name_btns span').textContent);
          console.log(professors);
          resolve(professors);
        }
      });
    });
  }
}

module.exports = Department;
