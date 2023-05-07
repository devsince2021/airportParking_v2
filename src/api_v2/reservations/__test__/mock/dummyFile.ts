import { Readable } from 'stream';

export const dummyFile: Express.Multer.File = {
  fieldname: 'file',
  originalname: 'test.txt',
  encoding: '7bit',
  mimetype: 'text/plain',
  size: 1024,
  buffer: Buffer.from('file contents'),
  destination: '/tmp',
  filename: 'test.txt',
  path: '/tmp/test.txt',
  stream: new Readable(),
};
