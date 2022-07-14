import nodemailer from 'nodemailer';
import { MAIL_CLIENT_ID, MAIL_CLIENT_SECRET, MAIL_PASSWORD, MAIL_REFRESH_TOKEN, MAIL_USERNAME } from '../../configEnv.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
    clientId: MAIL_CLIENT_ID,
    clientSecret: MAIL_CLIENT_SECRET,
    refreshToken: MAIL_REFRESH_TOKEN
  },
  secureConnection: false,
});


export const sendNotification = (mailOptions) => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      return ('Email sent: ' + info.response);
    }
  });

}
