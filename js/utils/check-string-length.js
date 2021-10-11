function isLongComment(comment, maxLength) {
  return comment.length <= maxLength;
}

export { isLongComment };
