# Inha Information

> Fetch Inha Univ. Information from Official Website

[![npm](https://img.shields.io/npm/v/inha-info.svg?style=for-the-badge)](https://www.npmjs.com/package/inha-info) [![npm](https://img.shields.io/npm/dt/inha-info.svg?style=for-the-badge)](https://www.npmjs.com/package/inha-info)

## ChangeLog

See [CHANGELOG](./CHANGELOG.md)

## Features

- Fetch all colleges information.
- Fetch all departments information.
- Fetch faculty/student restaurant menu information.

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

## API Documentation

See [API](https://astro36.github.io/inha-info/)

### Example

Fetch today student restaurant menus:

```javascript
const { restaurant } = require('inha-info');
console.log(await restaurant.getDailyStudentMenus(new Date()));
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
