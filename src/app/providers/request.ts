export class Request {
  id: number;
  userId: number;
  op: string;
  algorithm: string;
  keyStyle: string;
  password: string;
  keySize: number;
  keySizeString: string;
  mode: string;
  keyData: string;
  ivSize: number;
  ivData: string;
  fileName: string;
  processedAs: string;
  status: string;
  uploadComplete: boolean;
  keyId: number;
}