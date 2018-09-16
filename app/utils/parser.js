/* eslint-disable no-param-reassign */

export const objToArray = obj => {
  const array = Object.keys(obj).map(key => {
    obj[key].id = key;
    return obj[key];
  });
  return array;
};
