const CryptoJS = require('crypto-js');

const secretKey = process.env.SECRET_KEY; // Use a strong key and manage it securely

/**
 * Encrypts a JavaScript object or string.
 * @param {Object|string} data - Data to encrypt.
 * @returns {string} - Encrypted data as a string.
 */
function encrypt(data) {
    const jsonString = typeof data === 'object' ? JSON.stringify(data) : data;
    return CryptoJS.AES.encrypt(jsonString, secretKey).toString();
}

/**
 * Decrypts an encrypted string back into a JavaScript object or string.
 * @param {string} ciphertext - Encrypted data as a string.
 * @returns {Object|string} - Decrypted data.
 */
function decrypt(ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    try {
        return JSON.parse(decryptedData); // Attempt to parse as JSON
    } catch (e) {
        return decryptedData; // Return as string if not JSON
    }
}

module.exports = {
    encrypt,
    decrypt
};
