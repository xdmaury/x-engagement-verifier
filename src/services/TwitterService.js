import { Rettiwt } from "rettiwt-api";
import { config } from "../config/config.js";
import { logger } from "../utils/logger.js";

export class TwitterService {
  constructor() {
    this.client = new Rettiwt({ apiKey: config.apiKey, logging: false });
  }

  async withTimeout(promise, ms, label) {
    const timeout = new Promise((_, reject) => {
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
    });
    return Promise.race([promise, timeout]);
  }

  async getUserDetails(username) {
    try {
      return await this.withTimeout(
        this.client.user.details(username),
        8000,
        "getUserDetails"
      );
    } catch (error) {
      logger.error("Error fetching user details", { username, error: error?.message });
      return null;
    }
  }

  async getReplies(userId) {
    try {
      return await this.withTimeout(
        this.client.user.replies(userId),
        8000,
        "getReplies"
      );
    } catch (error) {
      logger.error("Error fetching replies", { userId, error: error?.message });
      return null;
    }
  }

  async getFollowing(userId) {
    try {
      return await this.withTimeout(
        this.client.user.following(userId),
        8000,
        "getFollowing"
      );
    } catch (error) {
      logger.error("Error fetching following", { userId, error: error?.message });
      return null;
    }
  }
}
