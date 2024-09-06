export const isSaveByReqUser = (reqUserId, post) => {
  if (!Array.isArray(post.users)) {
    return false;
  }
  for (let user of post.users) {
    if (reqUserId === user.id) {
      return true;
    }
  }
  return false;
};
