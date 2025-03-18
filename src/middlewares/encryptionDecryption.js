const CryptoJS = require("crypto-js");
require("dotenv").config({ path: "../../.env" });

class EncryptionMiddleware {
  constructor() {
    this.secretKey = process.env.SECRET_KEY;
    this.encryptionEnabled = process.env.ENCRYPTION_ENABLED === "true"; // Convert env variable to boolean
  }

  encrypt(text) {
    if (!this.encryptionEnabled) return text;
    return CryptoJS.AES.encrypt(text, this.secretKey).toString();
  }

  decrypt(text) {
    if (!this.encryptionEnabled) return text;
    try {
      const bytes = CryptoJS.AES.decrypt(text, this.secretKey);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      return null;
    }
  }

  encryptionDecryption() {
    return (req, res, next) => {
      if (this.encryptionEnabled) {
        // Decrypt incoming request body
        if (req.body && typeof req.body === "string") {
          const decrypted = this.decrypt(req.body);
          if (decrypted) {
            req.body = JSON.parse(decrypted);
          } else {
            return res.status(400).json({ error: "Invalid encrypted data" });
          }
        }

        // Encrypt response before sending
        const originalSend = res.send;
        res.send = (data) => {
          if (typeof data === "object") {
            data = this.encrypt(JSON.stringify(data));
          }
          originalSend.call(res, data);
        };
      }

      next();
    };
  }
}

module.exports = new EncryptionMiddleware();
