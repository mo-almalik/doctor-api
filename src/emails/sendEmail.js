import nodemailer from 'nodemailer'


export const sendMail = async (options) => {

    const transporter = nodemailer.createTransport({
        host: "mail.mosalah.dev",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.MAILER,
          pass: process.env.MAILER_PASSWORD
        },
      });
    
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: `"عافية " <${process.env.MAILER}>`, // sender address
          to: options.email, // list of receivers
          subject: "تأكيد الايميل ✔", // Subject line
          text: "Hello world?", // plain text body
          html: options.html, // html body
        });
      
       
    
}