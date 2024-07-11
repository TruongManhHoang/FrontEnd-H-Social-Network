export const isLikeByReqUser = (reqUserId, post) => {
  if (!Array.isArray(post.liked)) {
    return false;
  }
  for (let user of post.liked) {
    if (reqUserId === user.id) {
      return true;
    }
  }
  return false;
};
