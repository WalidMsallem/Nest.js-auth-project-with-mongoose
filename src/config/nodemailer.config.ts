import * as nodemailer from 'nodemailer';

export const nodeMailer = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gomycode.project@gmail.com',
    pass: '0123azeRTY',
  },
});
