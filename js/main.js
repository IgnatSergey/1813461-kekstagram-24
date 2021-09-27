const getRandomIntegerInRange = function (min, max) {
  if (min > max) {
    const temp = min;
    min = max;
    max = temp;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isLongComment = function (comment, maxLength) {
  return comment.length <= maxLength;
};

getRandomIntegerInRange(5, 10);
isLongComment('test test', 13);
