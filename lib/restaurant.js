const jsdom = require('jsdom');
const request = require('request');

const { JSDOM } = jsdom;

const FACULTY_RESTAURANT_URL = 'https://www.inha.ac.kr/user/restaurantMenList.do?siteId=kr&configIdx=1&id=kr_060302000000';
const STUDENT_RESTAURANT_URL = 'https://www.inha.ac.kr/user/restaurantMenList.do?siteId=kr&configIdx=2&id=kr_060301000000';

const format = date => `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(-2)}-${date.getDate()}`;

const getWeeklyFacultyMenus = date => new Promise((resolve, reject) => {
  while (date.getDay() !== 1) {
    date.setDate(date.getDate() - 1);
  }
  request(`${FACULTY_RESTAURANT_URL}&firstWeekDay=${format(date)}`, (err, httpResponse, body) => {
    if (err) {
      reject(err);
    } else {
      const { document } = new JSDOM(body).window;
      const menus = Array.from(document.querySelectorAll('tbody'))
        .slice(1)
        .map(tableElement => Array.from(tableElement.querySelectorAll('tr'))
          .map((rowElement) => {
            const [menuElement, priceElement] = rowElement.querySelectorAll('td');
            return {
              menus: Array.from(menuElement.querySelectorAll('p')).map(textElement => textElement.textContent.trim()),
              price: Number(priceElement.querySelector('div').textContent.trim()),
            };
          })
          .reduce((accumulator, currentValue, currentIndex) => {
            accumulator[['조식', '백반', '특식', '석식'][currentIndex]] = currentValue;
            return accumulator;
          }, {}));
      resolve([null, ...menus, null]);
    }
  });
});

const getDailyFacultyMenus = date => new Promise(
  async (resolve, reject) => getWeeklyFacultyMenus(date)
    .then(weeklyMenus => (weeklyMenus ? resolve(weeklyMenus[date.getDay()]) : resolve(null)))
    .catch(reject),
);

const getWeeklyStudentMenus = date => new Promise((resolve, reject) => {
  while (date.getDay() !== 1) {
    date.setDate(date.getDate() - 1);
  }
  request(`${STUDENT_RESTAURANT_URL}&firstWeekDay=${format(date)}`, (err, httpResponse, body) => {
    if (err) {
      reject(err);
    } else {
      const { document } = new JSDOM(body).window;
      const menus = Array.from(document.querySelectorAll('tbody'))
        .slice(1)
        .map(tableElement => Array.from(tableElement.querySelectorAll('tr'))
          .map((rowElement) => {
            const [menuElement, priceElement] = rowElement.querySelectorAll('td');
            if (menuElement.innerHTML.includes('<p')) {
              const foodElements = Array.from(menuElement.querySelectorAll('p'));
              return {
                menus: foodElements.map(textElement => textElement.textContent.trim()),
                prices: priceElement.querySelector('div')
                  .textContent
                  .trim()
                  .replace(/,/g, '')
                  .split('/')
                  .map(Number)
                  .filter(Boolean),
              };
            }
            if (menuElement.textContent.includes('■ ')) {
              const foodElements = menuElement.querySelector('div')
                .textContent
                .trim()
                .split('\n')
                .map(element => element.trim());
              return {
                menus: foodElements.map(element => element.replace('■ ', '').split(' ')[0]),
                prices: foodElements.map(element => Number(element.match(/\\([\d,]+)/)[1].replace(/,/g, ''))),
              };
            }
            return null;
          })
          .reduce((accumulator, currentValue, currentIndex) => {
            const [time, place] = [
              ['조식', '소반'],
              ['조식', '스낵'],
              ['중식', '뚝배기'],
              ['중식', '명가'],
              ['중식', '누들'],
              ['중식', '소반'],
              ['중식', '돈까스'],
              ['Casual/Dining'],
              ['스낵1'],
              ['스낵2'],
              ['석식', '뚝배기'],
              ['석식', '명가'],
              ['석식', '소반'],
            ][currentIndex];
            if (time in accumulator) {
              if (place) {
                accumulator[time][place] = currentValue;
              } else {
                accumulator[time] = accumulator;
              }
            } else if (place) {
              accumulator[time] = { [place]: currentValue };
            } else {
              accumulator[time] = currentValue;
            }
            return accumulator;
          }, {}));
      resolve([null, ...menus, null]);
    }
  });
});

const getDailyStudentMenus = date => new Promise(
  async (resolve, reject) => getWeeklyStudentMenus(date)
    .then(weeklyMenus => (weeklyMenus ? resolve(weeklyMenus[date.getDay()]) : resolve(null)))
    .catch(reject),
);

(async () => {
  console.log((await getWeeklyStudentMenus(new Date())));
})();

module.exports = {
  getDailyFacultyMenus,
  getDailyStudentMenus,
  getWeeklyFacultyMenus,
  getWeeklyStudentMenus,
};
