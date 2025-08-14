import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CryptoUtils {
  // The key used for encryption/decryption
  private static readonly SECRET_KEY = 'SOfficeSecretKey888';

  /**
   * Encrypts a string using the same algorithm as Flutter's simpleEncrypt
   * @param text The plaintext to encrypt
   * @returns Base64 encoded encrypted string
   */
  static encryptToken(text: string): string {
    return this.simpleEncrypt(text, this.SECRET_KEY);
  }

  /**
   * Decrypts a string that was encrypted with simpleEncrypt
   * @param encryptedText The base64 encoded encrypted text
   * @returns The decrypted string
   */
  static decryptToken(encryptedText: string): string {
    return this.simpleDecrypt(encryptedText, this.SECRET_KEY);
  }

  /**
   * Encrypts a string using XOR with the provided key
   */
  private static simpleEncrypt(text: string, key: string): string {
    try {
      const textBytes = this.stringToUtf8Bytes(text);
      const keyBytes = this.stringToUtf8Bytes(key);
      const result = new Uint8Array(textBytes.length);

      // XOR each byte to encrypt (matching Flutter's implementation)
      for (let i = 0; i < textBytes.length; i++) {
        result[i] = textBytes[i] ^ keyBytes[i % keyBytes.length];
      }

      // Convert result to base64
      return this.bytesToBase64(result);
    } catch (e) {
      console.error('Error encrypting data:', e);
      return '';
    }
  }

  /**
   * Decrypts a string using XOR with the provided key
   */
  private static simpleDecrypt(encryptedText: string, key: string): string {
    try {
      // Decode base64 string to get encrypted bytes
      const encryptedBytes = this.base64ToBytes(encryptedText);
      const keyBytes = this.stringToUtf8Bytes(key);
      const result = new Uint8Array(encryptedBytes.length);

      // XOR each byte to decrypt (same algorithm as encryption)
      for (let i = 0; i < encryptedBytes.length; i++) {
        result[i] = encryptedBytes[i] ^ keyBytes[i % keyBytes.length];
      }

      // Convert result back to string
      return this.utf8BytesToString(result);
    } catch (e) {
      console.error('Error decrypting data:', e);
      return '';
    }
  }

  // Helper method to convert byte array to base64
  private static bytesToBase64(bytes: Uint8Array): string {
    const binary = Array.from(bytes)
      .map((b) => String.fromCharCode(b))
      .join('');
    return window.btoa(binary);
  }

  // Helper method to convert base64 to byte array
  private static base64ToBytes(base64: string): Uint8Array {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  // Helper method to convert string to UTF-8 bytes
  private static stringToUtf8Bytes(str: string): Uint8Array {
    const encoder = new TextEncoder();
    return encoder.encode(str);
  }

  // Helper method to convert UTF-8 bytes to string
  private static utf8BytesToString(bytes: Uint8Array): string {
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(bytes);
  }
}
