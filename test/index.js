const assert = require('assert');

const inhaInfo = require('../lib');
const { College, Department } = inhaInfo;

describe('inhaInfo', () => {
  describe('#getAllColleges()', () => {
    it('Fetch all colleges information.', async () => {
      const colleges = await inhaInfo.getAllColleges();
      assert.ok(Array.isArray(colleges));
      assert.ok(colleges[0] instanceof College);
    });
  });

  describe('#getAllDepartments()', () => {
    it('Fetch all departments information.', async () => {
      const depts = await inhaInfo.getAllDepartments();
      assert.ok(Array.isArray(depts));
      assert.ok(depts[0] instanceof Department);
    });
  });
});
