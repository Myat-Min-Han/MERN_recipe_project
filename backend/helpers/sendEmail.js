const nodemailer = require("nodemailer");
const ejs = require('ejs')

const sendEmail = async ({path, data, from, to, subject}) => {
        try {
            var transport = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS
                }
            });
        
            let dataString = await ejs.renderFile("./views/" + path + ".ejs", data);
            const info = await transport.sendMail({
                    from, // sender address
                    to, // list of receivers
                    subject, // Subject line
                    html: dataString, // html body
                });
        
                console.log("Message sent: %s", info.messageId)
        } catch(e) {
            throw new Error(e)
        }
    }

module.exports = sendEmail