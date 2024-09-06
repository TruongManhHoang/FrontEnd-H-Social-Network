export const isFollowReqUser = (reqUserId, follow) => {
  if (!Array.isArray(follow.followings)) {
    return false;
  }
  for (let user of follow.followings) {
    if (reqUserId === user.id) {
      return true;
    }
  }
  return false;
};
