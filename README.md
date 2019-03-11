# Inha Information

> Fetch Inha Univ. Information from Official Website

[![npm](https://img.shields.io/npm/v/inha-info.svg?style=for-the-badge)](https://www.npmjs.com/package/inha-info) [![npm](https://img.shields.io/npm/dt/inha-info.svg?style=for-the-badge)](https://www.npmjs.com/package/inha-info)

## Features

- Fetch all colleges information.
- Fetch all departments information.
- Fetch all professors information.

## Installation

- Install with npm:

```bash
npm install inha-info --save
```

- Clone the repo:

```bash
git clone https://github.com/Astro36/inha-info.git
```

## Usage

### Example

Fetch all college name list:

```javascript
const inhaInfo = require('inha-info');
const colleges = await inhaInfo.getAllColleges();
console.log(colleges.map(college => college.name)); // ['프런티어 학부대학', '공과대학', '자연과학대학', ... ]
```

Fetch all department name list:

```javascript
const inhaInfo = require('inha-info');
const depts = await inhaInfo.getAllDepartments();
console.log(depts.map(dept => dept.name)); // ['기계공학과', '항공우주공학과', '조선해양공학과', ... ]
```

Fetch [ICE](http://www.inha.ac.kr/cop/search/introList.do?siteId=kr&deptCode=1185&majorCodeH=283&majorCodeS=0022&codeS=0183&id=kr_030201200000)’s course name list:

```javascript
const inhaInfo = require('inha-info');
const depts = await inhaInfo.getAllDepartments()
const courses = await depts.find(dept => dept.name === '정보통신공학과').getCourses();
console.log(courses.map(course => course.name)); // ['크로스오버 1 : 인간의 탐색', '크로스오버 3 : 사회의 탐색', ... ]
```

Fetch [ICE](http://www.inha.ac.kr/cop/search/introList.do?siteId=kr&deptCode=1185&majorCodeH=283&majorCodeS=0022&codeS=0183&id=kr_030201200000)’s restricted course name list:

```javascript
const inhaInfo = require('inha-info');
const depts = await inhaInfo.getAllDepartments()
const courses = await depts.find(dept => dept.name === '정보통신공학과').getRestrictedCourses();
console.log(courses.map(course => course.name)); // ['C언어', '객체지향프로그래밍', '수치해석', ... ]
```

Fetch all professor name list:

```javascript
const inhaInfo = require('inha-info');
const depts = await inhaInfo.getAllDepartments();
const profs = await Promise.all(depts.map(dept => dept.getProfessors()));
console.log(profs.flat()); // ['김광용 교수', '김재도 교수', '이우식 교수', ... ]
```

## License

```text
Copyright (c) 2019 Seungjae Park

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

Inha Information is licensed under the [MIT License](./LICENSE).
