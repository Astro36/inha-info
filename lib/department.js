const jsdom = require('jsdom');
const request = require('request');

const departments = require('../data/departments');

/** @module department */

const { JSDOM } = jsdom;

/**
 * Returns a matched department data in the DB.
 * @param {string} name
 * @returns {?Department}
 */
const find = name => departments.find(department => department.name === name) || null;

/**
 * Returns all department data from DB.
 * @returns {Array.<Department>}
 */
const getAll = () => departments;

/**
 * Returns the department course curriculum.
 * @async
 * @param {Department} department
 * @returns {Promise.<Array.<Course>>}
 */
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

/**
 * Returns the department information.
 * @async
 * @param {Department} department
 * @returns {Promise.<Informaion>}
 */
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
          description: '',
          telephone,
          fax,
          location,
          url: document.querySelector('.go_homepage a').href,
        });
      } else {
        reject(new Error('Invalid metadata format'));
      }
    }
  });
});

/**
 * Returns the department faculty member names.
 * @async
 * @param {Department} department
 * @returns {Promise.<string>}
 */
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

/**
 * Returns the department restricted courses.
 * @async
 * @param {Department} department
 * @returns {Promise.<Array.<Course>>}
 */
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
