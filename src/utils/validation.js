export const validateVerifyInput = (body) => {
  const errors = [];
  const username = typeof body?.username === "string" ? body.username.trim() : "";
  const postId = typeof body?.postId === "string" ? body.postId.trim() : "";
  const pageName = typeof body?.pageName === "string" ? body.pageName.trim() : "";

  if (!username) {
    errors.push({ field: "username", message: "username is required" });
  }

  if (!postId) {
    errors.push({ field: "postId", message: "postId is required" });
  } else if (!/^[0-9]+$/.test(postId)) {
    errors.push({ field: "postId", message: "postId must be numeric" });
  }

  if (!pageName) {
    errors.push({ field: "pageName", message: "pageName is required" });
  }

  return {
    isValid: errors.length === 0,
    errors,
    value: { username, postId, pageName },
  };
};
