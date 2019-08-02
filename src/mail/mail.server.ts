import { NotFoundException } from "@nestjs/common";
import { nodeMailer } from '../config/nodemailer.config';
export class MailService {


    async sendVerifyEMail(token , httpMethodes, emailDetails) {
        const {req , res } = httpMethodes
        console.log(emailDetails,"emailDetails")
        
        const   sendEmail = await  nodeMailer.sendMail({
          to: emailDetails.to ,
          from: emailDetails.from,
          subject: emailDetails.subject,
          html: emailDetails.content
        })
      
         if (! sendEmail) {
          throw new NotFoundException('cannot send email code e');
         }
         else  {
          res.json({ message : "token sended "})
         }
      }

} 

