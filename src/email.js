"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
var emailDetails = {
    approved: {
        subject: 'Your InstaGrants application has been approved!',
        body: 'You will be receiving the full grant amount and the next steps shortly'
    },
    rejected: {
        subject: 'Your InstaGrants application has been rejected',
        body: 'We are sorry to inform you that your application has been rejected. Please contact us if you have any questions.'
    },
    meeting: {
        subject: 'Additionals details required for your InstaGrants application',
        body: 'Please reply to this email to schedule a meeting with us to provide additional details about your project'
    }
};
exports.default = (function (applier, emailToSend) {
    var transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: process.env['EMAIL_USER'],
            pass: process.env['EMAIL_PASS']
        }
    });
    // @ts-ignore
    var body = emailDetails[emailToSend]['body'];
    // @ts-ignore
    var subject = emailDetails[emailToSend]['subject'];
    var mailOptions = {
        from: 'instagrants@superteam.fun',
        to: applier,
        subject: subject,
        body: body
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error)
            console.error(error);
        if (info)
            console.log(info);
    });
});
