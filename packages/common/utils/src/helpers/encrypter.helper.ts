import crypto, { randomBytes } from 'crypto';

export class Encrypter {
  private readonly algorithm: string;
  private readonly secret: string | Buffer;
  private readonly iv: string | Buffer;

  constructor(opts?: { algorithm?: string; secret?: string; iv?: string }) {
    this.algorithm = opts?.algorithm || 'aes-256-cbc';
    this.secret = opts?.secret || randomBytes(32);
    this.iv = opts?.iv || randomBytes(16);
  }

  encrypted(target: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.secret, this.iv);
    return cipher.update(target, 'utf8', 'hex') + cipher.final('hex');
  }

  decrypted(encryptedText: string): string {
    const decipher = crypto.createDecipheriv(this.algorithm, this.secret, this.iv);
    return decipher.update(encryptedText, 'hex', 'utf8') + decipher.final('utf8');
  }
}
