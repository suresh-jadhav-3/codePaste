import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ name, email, password }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.login({ email, password, name });
      }

      return userAccount;
    } catch (error) {
      console.error("Appwrite create error:", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await this.account.deleteSession("current");
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }

  async updateName(name) {
    try {
      return await this.account.updateName(name);
    } catch (error) {
      console.error("Update name error:", error);
      throw error;
    }
  }

  async updateEmail(email, password) {
    try {
      return await this.account.updateEmail(email, password);
    } catch (error) {
      console.error("Update email error:", error);
      throw error;
    }
  }

  async updatePassword(newPass, oldPass) {
    try {
      return await this.account.updatePassword(newPass, oldPass);
    } catch (error) {
      console.error("Update password error:", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
  }
}

const authService = new AuthService();

export default authService;
