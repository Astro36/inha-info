const createArraySchema = type => ({ type: 'array', items: type });
const createNullableSchema = type => ({ oneOf: [type, { type: 'null' }] });

const nullableStringSchema = createNullableSchema({ type: 'string' });
const numberArraySchema = createArraySchema('number');
const stringArraySchema = createArraySchema('string');

const collegeSchema = {
  type: 'object',
  properties: {
    name: 'string',
    departments: stringArraySchema,
    pageId: 'string',
    url: 'string',
  },
  required: ['name', 'departments', 'pageId', 'url'],
};

const courseSchema = {
  type: 'object',
  properties: {
    category: 'string',
    id: 'string',
    name: 'string',
    credit: 'string',
    note: nullableStringSchema,
  },
  required: ['category', 'id', 'name', 'credit', 'note'],
};

const departmentSchema = {
  type: 'object',
  properties: {
    name: 'string',
    id: 'string',
    subId1: 'string',
    subId2: 'string',
  },
  required: ['name', 'id', 'subId1', 'subId2'],
};

const facultyRestaurantMenusSchema = {
  type: 'object',
  properties: {
    조식: {
      type: 'object',
      properties: {
        menus: stringArraySchema,
        price: 'number',
      },
      required: ['menus', 'price'],
    },
    백반: {
      type: 'object',
      properties: {
        menus: stringArraySchema,
        price: 'number',
      },
      required: ['menus', 'price'],
    },
    특식: {
      type: 'object',
      properties: {
        menus: stringArraySchema,
        price: 'number',
      },
      required: ['menus', 'price'],
    },
    석식: {
      type: 'object',
      properties: {
        menus: stringArraySchema,
        price: 'number',
      },
      required: ['menus', 'price'],
    },
  },
  required: ['조식', '백반', '특식', '석식'],
};

const informationSchema = {
  type: 'object',
  properties: {
    name: 'string',
    description: 'string',
    telephone: 'string',
    fax: nullableStringSchema,
    location: 'string',
    url: 'string',
  },
  required: ['name', 'description', 'telephone', 'fax', 'location', 'url'],
};

const studentRestaurantMenusSchema = {
  type: 'object',
  properties: {
    조식: {
      type: 'object',
      properties: {
        소반: {
          type: 'object',
          properties: createNullableSchema({
            type: 'object',
            properties: {
              menus: stringArraySchema,
              prices: numberArraySchema,
            },
            required: ['menus', 'prices'],
          }),
        },
        스낵: {
          type: 'object',
          properties: createNullableSchema({
            type: 'object',
            properties: {
              menus: stringArraySchema,
              prices: numberArraySchema,
            },
            required: ['menus', 'prices'],
          }),
        },
      },
      required: ['소반', '스낵'],
    },
    중식: {
      type: 'object',
      properties: {
        뚝배기: {
          type: 'object',
          properties: createNullableSchema({
            type: 'object',
            properties: {
              menus: stringArraySchema,
              prices: numberArraySchema,
            },
            required: ['menus', 'prices'],
          }),
        },
        명가: {
          type: 'object',
          properties: createNullableSchema({
            type: 'object',
            properties: {
              menus: stringArraySchema,
              prices: numberArraySchema,
            },
            required: ['menus', 'prices'],
          }),
        },
        누들: {
          type: 'object',
          properties: createNullableSchema({
            type: 'object',
            properties: {
              menus: stringArraySchema,
              prices: numberArraySchema,
            },
            required: ['menus', 'prices'],
          }),
        },
        소반: {
          type: 'object',
          properties: createNullableSchema({
            type: 'object',
            properties: {
              menus: stringArraySchema,
              prices: numberArraySchema,
            },
            required: ['menus', 'prices'],
          }),
        },
        돈까스: {
          type: 'object',
          properties: createNullableSchema({
            type: 'object',
            properties: {
              menus: stringArraySchema,
              prices: numberArraySchema,
            },
            required: ['menus', 'prices'],
          }),
        },
      },
      required: ['뚝배기', '명가', '누들', '스낵', '돈까스'],
    },
    'Casual/Dining': createNullableSchema({
      type: 'object',
      properties: {
        menus: stringArraySchema,
        prices: numberArraySchema,
      },
      required: ['menus', 'prices'],
    }),
    스낵1: createNullableSchema({
      type: 'object',
      properties: {
        menus: stringArraySchema,
        prices: numberArraySchema,
      },
      required: ['menus', 'prices'],
    }),
    스낵2: createNullableSchema({
      type: 'object',
      properties: {
        menus: stringArraySchema,
        prices: numberArraySchema,
      },
      required: ['menus', 'prices'],
    }),
    석식: {
      type: 'object',
      properties: {
        뚝배기: {
          type: 'object',
          properties: createNullableSchema({
            type: 'object',
            properties: {
              menus: stringArraySchema,
              prices: numberArraySchema,
            },
            required: ['menus', 'prices'],
          }),
        },
        명가: {
          type: 'object',
          properties: createNullableSchema({
            type: 'object',
            properties: {
              menus: stringArraySchema,
              prices: numberArraySchema,
            },
            required: ['menus', 'prices'],
          }),
        },
        소반: {
          type: 'object',
          properties: createNullableSchema({
            type: 'object',
            properties: {
              menus: stringArraySchema,
              prices: numberArraySchema,
            },
            required: ['menus', 'prices'],
          }),
        },
      },
      required: ['뚝배기', '명가', '소반'],
    },
  },
  required: ['조식', '중식', 'Casual/Dining', '스낵1', '스낵2', '석식'],
};

module.exports = {
  createArraySchema,
  createNullableSchema,
  collegeSchema,
  courseSchema,
  departmentSchema,
  facultyRestaurantMenusSchema,
  informationSchema,
  nullableStringSchema,
  numberArraySchema,
  stringArraySchema,
  studentRestaurantMenusSchema,
};
