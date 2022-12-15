export const useConvertArrayToObject = (arr) => {
  const resultArrayOfObjects = [];
  for (let i = 0; i < arr?.data?.data.length; i++) {
    const makeObj = { value: arr.data.data[i], label: arr.data.data[i] };
    resultArrayOfObjects.push(makeObj);
  }

  return resultArrayOfObjects;
};

