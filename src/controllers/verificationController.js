import { TwitterService } from "../services/TwitterService.js";
import { validateVerifyInput } from "../utils/validation.js";

const twitterService = new TwitterService();

export const verifyUser = async (req, res, next) => {
  try {
    const { isValid, errors, value } = validateVerifyInput(req.body);

    if (!isValid) {
      return res.status(400).json({
        ok: false,
        errors,
      });
    }

    const { username, postId, pageName } = value;
    const user = await twitterService.getUserDetails(username);

    if (!user?.id) {
      return res.status(404).json({
        ok: true,
        input: value,
        results: {
          userFound: false,
          repliedToPost: false,
          followsPage: false,
        },
        details: {
          userId: null,
          replyId: null,
        },
      });
    }

    const [replies, following] = await Promise.allSettled([
      twitterService.getReplies(user.id),
      twitterService.getFollowing(user.id),
    ]);


    const repliesList =
      replies.status === "fulfilled" ? replies.value?.list ?? [] : [];

    const followingList =
      following.status === "fulfilled" ? following.value?.list ?? [] : [];


    const matchedReply = repliesList.find(
      (reply) => reply.retweetedTweet?.id === postId
    );

    const followsPage = followingList.some(
      (follower) =>
        typeof follower?.userName === "string" &&
        follower.userName.toLowerCase() === pageName.toLowerCase()
    );

    return res.json({
      ok: true,
      input: value,
      results: {
        userFound: true,
        repliedToPost: Boolean(matchedReply),
        followsPage,
      },
      details: {
        userId: user.id,
        replyId: matchedReply?.id ?? null,
      },
    });
  } catch (error) {
    return next(error);
  }
};
