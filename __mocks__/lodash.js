// lodash をモックに置き換える
const lodash = jest.createMockFromModule('lodash');

lodash.head = arr => 5;

export default lodash;
