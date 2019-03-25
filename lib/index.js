const jsdom = require('jsdom');
const request = require('request');

const College = require('./College');
const Course = require('./Course');
const Department = require('./Department');
const restaurant = require('./restaurant');

const { JSDOM } = jsdom;

const getAllColleges = () => new Promise((resolve, reject) => {
  request('http://www.inha.ac.kr/mbshome/mbs/kr/subview.do?id=kr_030213000000', (err, httpResponse, body) => {
    if (err) {
      reject(err);
    } else {
      const { document } = new JSDOM(body).window;
      const colleges = Array.from(document.querySelectorAll('.college_group'))
        .map(groupElement => College.from(groupElement));
      resolve(colleges);
    }
  });
});

const getAllDepartments = () => new Promise((resolve, reject) => {
  request('http://www.inha.ac.kr/mbshome/mbs/kr/subview.do?id=kr_030213000000', (err, httpResponse, body) => {
    if (err) {
      reject(err);
    } else {
      const { document } = new JSDOM(body).window;
      const departments = Array.from(document.querySelectorAll('.college_lineup li a'))
        .map(element => Department.from(element));
      resolve(departments);
    }
  });
});


module.exports = {
  College,
  Course,
  Department,
  getAllColleges,
  getAllDepartments,
  restaurant,
};
