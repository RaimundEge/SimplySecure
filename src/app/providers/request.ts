export class Request {
  id: number = 0;
  userId: number = 0;
  op: string = '';
  algorithm: string = '';
  keyStyle: string = '';
  password: string = '';
  keySize: number = 0;
  keySizeString: string = '';
  mode: string = '';
  keyData: string = '';
  ivSize: number = 0;
  ivData: string = '';
  fileName: string = '';
  processedAs: string = '';
  status: string = '';
  uploadComplete: boolean = true;
  keyId: number | null = null;
}