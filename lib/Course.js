class Course {
  constructor(category, id, name, credit, note) {
    this.category = category;
    this.id = id;
    this.name = name;
    this.credit = credit;
    this.note = note;
  }

  static get Builder() {
    return class {
      constructor(name) {
        this.category = Course.UNDEFINED;
        this.id = null;
        this.name = name;
        this.credit = 0;
        this.note = null;
      }

      build() {
        const {
          category, id, name, credit, note,
        } = this;
        return new Course(category, id, name, credit, note);
      }

      setCategory(category) {
        switch (category) {
          case '교양선택':
            this.category = Course.GENERAL_ELECTIVE;
            break;
          case '교양필수':
            this.category = Course.GENERAL_REQUIRED;
            break;
          case '전공선택':
            this.category = Course.MAJOR_ELECTIVE;
            break;
          case '전공필수':
            this.category = Course.MAJOR_REQUIRED;
            break;
          default:
            throw new Error('Cannot find the categoty.');
        }
        return this;
      }

      setCredit(credit) {
        this.credit = Number(credit);
        return this;
      }

      setId(id) {
        this.id = id || null;
        return this;
      }

      setName(name) {
        if (name) {
          this.name = name;
        } else {
          throw new Error('Course name must not be null.');
        }
        return this;
      }

      setNote(note) {
        this.note = note || null;
        return this;
      }
    };
  }
}

Course.UNDEFINED = 0;
Course.GENERAL_ELECTIVE = 1;
Course.GENERAL_REQUIRED = 2;
Course.MAJOR_ELECTIVE = 3;
Course.MAJOR_REQUIRED = 4;

module.exports = Course;
