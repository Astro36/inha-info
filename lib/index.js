const college = require('./college');
const department = require('./department');
const restaurant = require('./restaurant');

/**
 * @typedef {Object} College
 * @property {string} name
 * @property {Array.<string>} departments
 * @property {string} pageId
 * @property {string} url
 */

/**
 * @typedef {Object} Course
 * @property {string} category
 * @property {string} id
 * @property {string} name
 * @property {number} credit
 * @property {?string} note
 */

/**
 * @typedef {Object} Department
 * @property {string} name
 * @property {string} id
 * @property {string} subId1
 * @property {string} subId2
 */

/**
 * @typedef {Object} FacultyRestaurantMenus
 * @property {Object} 조식
 * @property {Array.<string>} 조식.menus
 * @property {number} 조식.price
 * @property {Object} 백반
 * @property {Array.<string>} 백반.menus
 * @property {number} 백반.price
 * @property {Object} 특식
 * @property {Array.<string>} 특식.menus
 * @property {number} 특식.price
 * @property {Object} 석식
 * @property {Array.<string>} 석식.menus
 * @property {number} 석식.price
 */

/**
 * @typedef {Object} Informaion
 * @property {string} name
 * @property {string} description
 * @property {string} telephone
 * @property {?string} fax
 * @property {string} location
 * @property {string} url
 */

/**
 * @typedef {Object} StudentRestaurantMenus
 * @property {Object} 조식
 * @property {?Object} 조식.소반
 * @property {Array.<string>} 조식.소반.menus
 * @property {Array.<number>} 조식.소반.prices
 * @property {?Object} 조식.스낵
 * @property {Array.<string>} 조식.스낵.menus
 * @property {Array.<number>} 조식.스낵.prices
 * @property {Object} 중식
 * @property {?Object} 중식.뚝배기
 * @property {Array.<string>} 중식.뚝배기.menus
 * @property {Array.<number>} 중식.뚝배기.prices
 * @property {?Object} 중식.명가
 * @property {Array.<string>} 중식.명가.menus
 * @property {Array.<number>} 중식.명가.prices
 * @property {?Object} 중식.누들
 * @property {Array.<string>} 중식.누들.menus
 * @property {Array.<number>} 중식.누들.prices
 * @property {?Object} 중식.소반
 * @property {Array.<string>} 중식.소반.menus
 * @property {Array.<number>} 중식.소반.prices
 * @property {?Object} 중식.돈까스
 * @property {Array.<string>} 중식.돈까스.menus
 * @property {Array.<number>} 중식.돈까스.prices
 * @property {?Object} 'Casual/Dining'
 * @property {Array.<string>} 'Casual/Dining'.menus
 * @property {Array.<number>} 'Casual/Dining'.prices
 * @property {?Object} 스낵1
 * @property {Array.<string>} 스낵1.menus
 * @property {Array.<number>} 스낵1.prices
 * @property {?Object} 스낵2
 * @property {Array.<string>} 스낵2.menus
 * @property {Array.<number>} 스낵2.prices
 * @property {Object} 석식
 * @property {?Object} 석식.뚝배기
 * @property {Array.<string>} 석식.뚝배기.menus
 * @property {Array.<number>} 석식.뚝배기.prices
 * @property {?Object} 석식.명가
 * @property {Array.<string>} 석식.명가.menus
 * @property {Array.<number>} 석식.명가.prices
 * @property {?Object} 석식.소반
 * @property {Array.<string>} 석식.소반.menus
 * @property {Array.<number>} 석식.소반.prices
 */

module.exports = {
  college,
  department,
  restaurant,
};
