const jsdom = require('jsdom');
const request = require('request');

const departments = require('../data/departments');

const { JSDOM } = jsdom;

const find = name => departments.find(department => department.name === name) || null;

const getAll = () => departments.map(({ name }) => name);

const getCourses = department => new Promise((resolve, reject) => {
  const { id, subId1 } = department;
  request(`http://www.inha.ac.kr/cop/search/curriculum.do?siteId=kr&deptCode=${id}&majorCodeH=${subId1}&gubun=1`, (err, httpResponse, body) => {
    if (err) {
      reject(err);
    } else {
      const { document } = new JSDOM(body).window;
      const courses = Array.from(document.querySelectorAll('.tbl_01C table tbody tr'))
        .slice(1, -1)
        .map((rowElement) => {
          const [category, , , course, name, credit, , note] = rowElement.querySelectorAll('td');
          return {
            category: category.textContent,
            id: course.textContent,
            name: name.textContent,
            credit: Number(credit.textContent),
            note: note.textContent || null,
          };
        });
      resolve(courses);
    }
  });
});

const getInformation = department => new Promise((resolve, reject) => {
  const { name, id, subId1 } = department;
  request(`http://www.inha.ac.kr/cop/search/introList.do?siteId=kr&deptCode=${id}&majorCodeH=${subId1}`, (err, httpResponse, body) => {
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

const getProfessors = department => new Promise((resolve, reject) => {
  const { id, subId1, subId2 } = department;
  request(`http://www.inha.ac.kr/cop/search/profList.do?siteId=kr&deptCode=${id}&majorCodeH=${subId1}&majorCodeS=${subId2}`, (err, httpResponse, body) => {
    if (err) {
      reject(err);
    } else {
      const { document } = new JSDOM(body).window;
      const professors = Array.from(document.querySelectorAll('.humanList .infoWrap'))
        .map(element => element.querySelector('.name_btns span').textContent);
      resolve(professors);
    }
  });
});

const getRestrictedCourses = department => new Promise((resolve, reject) => {
  const { id, subId1 } = department;
  request(`http://www.inha.ac.kr/cop/search/curriculum.do?siteId=kr&deptCode=${id}&majorCodeH=${subId1}&gubun=9`, (err, httpResponse, body) => {
    if (err) {
      reject(err);
    } else {
      const { document } = new JSDOM(body).window;
      const courses = Array.from(document.querySelectorAll('.tbl_01C table tbody tr'))
        .slice(1, -1)
        .map((rowElement) => {
          const [course, name, credit, category] = rowElement.querySelectorAll('td');
          return {
            category: category.textContent,
            id: course.textContent,
            name: name.textContent,
            credit: Number(credit.textContent),
            note: '' || null,
          };
        });
      resolve(courses);
    }
  });
});

module.exports = {
  find,
  getAll,
  getCourses,
  getInformation,
  getProfessors,
  getRestrictedCourses,
};
