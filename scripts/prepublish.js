const fs = require('fs');
const jsdom = require('jsdom');
const path = require('path');
const request = require('request');

const { JSDOM } = jsdom;

const UNIV_URL = 'http://www.inha.ac.kr/mbshome/mbs/kr/subview.do?id=kr_030213000000';

request(UNIV_URL, (err, httpResponse, body) => {
  if (err) {
    throw new Error();
  } else {
    const { document } = new JSDOM(body).window;
    const colleges = Array.from(document.querySelectorAll('.college_group'))
      .map(groupElement => ({
        name: groupElement.querySelector('.college_head h3').textContent,
        departments: Array.from(groupElement.querySelectorAll('.college_lineup li a')).map(itemElement => itemElement.textContent),
        pageId: groupElement.querySelector('.college_more a').href.match(/id=([\w_]+)/)[1],
        url: groupElement.querySelector('.college_homepage a').href,
      }));
    fs.writeFileSync(path.join(__dirname, '../data/colleges.json'), JSON.stringify(colleges, null, 4));
  }
});

request(UNIV_URL, (err, httpResponse, body) => {
  if (err) {
    throw new Error();
  } else {
    const { document } = new JSDOM(body).window;
    const departments = Array.from(document.querySelectorAll('.college_lineup li a'))
      .map(element => ({
        name: element.textContent,
        id: element.href.match(/deptCode=(\d+)/)[1],
        subId: element.href.match(/majorCodeH=(\d+)/)[1],
      }));
    fs.writeFileSync(path.join(__dirname, '../data/departments.json'), JSON.stringify(departments, null, 4));
  }
});
