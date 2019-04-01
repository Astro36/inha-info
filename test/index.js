const chai = require('chai');

const { college, department, restaurant } = require('../lib');
const {
  createArraySchema,
  createNullableSchema,
  collegeSchema,
  courseSchema,
  departmentSchema,
  facultyRestaurantMenusSchema,
  informationSchema,
  stringArraySchema,
  studentRestaurantMenusSchema,
} = require('./schemas');

const { expect } = chai;

chai.use(require('chai-json-schema'));

describe('inhaInfo', () => {
  const myCollege = college.find('공과대학');
  const myDepartment = department.find('정보통신공학과');
  const now = new Date();

  describe('module:college', () => {
    describe('~find(name)', () => {
      context('when not present', () => {
        it('should return null', () => expect(college.find('법학대학')).to.be.null);
      });
      context('when present', () => {
        it('should return a matched college data in the DB', () => expect(myCollege).to.be.jsonSchema(collegeSchema));
      });
    });

    describe('~getAll()', () => {
      it('should return all college data from DB', () => expect(college.getAll()).to.be.jsonSchema(createArraySchema(collegeSchema)));
    });

    describe('~getInformation(college)', () => {
      it('should return the college information', async () => expect(await college.getInformation(myCollege)).to.be.jsonSchema(informationSchema));
    });
  });

  describe('module:department', () => {
    describe('~find(name)', () => {
      context('when not present', () => {
        it('should return null', () => expect(department.find('전자통신공학과')).to.be.null);
      });
      context('when present', () => {
        it('should return a matched department data in the DB', () => expect(myDepartment).to.be.jsonSchema(departmentSchema));
      });
    });

    describe('~getAll()', () => {
      it('should return all department data from DB', () => expect(department.getAll()).to.be.jsonSchema(createArraySchema(departmentSchema)));
    });

    describe('~getCourses(department)', () => {
      it('should return the department course curriculum', async () => expect(await department.getCourses(myDepartment)).to.be.jsonSchema(createArraySchema(courseSchema)));
    });

    describe('~getInformation(department)', () => {
      it('should return the department information', async () => expect(await department.getInformation(myDepartment)).to.be.jsonSchema(informationSchema));
    });

    describe('~getProfessors(department)', () => {
      it('should return the department faculty member names', async () => expect(await department.getProfessors(myDepartment)).to.be.jsonSchema(stringArraySchema));
    });

    describe('~getRestrictedCourses(department)', () => {
      it('should return the department restricted courses', async () => expect(await department.getRestrictedCourses(myDepartment)).to.be.jsonSchema(createArraySchema(courseSchema)));
    });
  });

  describe('module:restaurant', () => {
    describe('~getDailyFacultyMenus(date)', () => {
      it('should return a daily faculty restaurant menu', async () => expect(await restaurant.getDailyFacultyMenus(now)).to.be.jsonSchema(createNullableSchema(facultyRestaurantMenusSchema)));
    });

    describe('~getDailyStudentMenus(date)', () => {
      it('should return a daily student restaurant menu', async () => expect(await restaurant.getDailyStudentMenus(now)).to.be.jsonSchema(createNullableSchema(studentRestaurantMenusSchema)));
    });

    describe('~getWeeklyFacultyMenus(date)', () => {
      it('should return weekly faculty restaurant menus', async () => expect(await restaurant.getWeeklyFacultyMenus(now)).to.be.jsonSchema(createArraySchema(createNullableSchema(facultyRestaurantMenusSchema))));
    });

    describe('~getWeeklyStudentMenus(date)', () => {
      it('should return weekly student restaurant menus', async () => expect(await restaurant.getWeeklyStudentMenus(now)).to.be.jsonSchema(createArraySchema(createNullableSchema(studentRestaurantMenusSchema))));
    });
  });
});
