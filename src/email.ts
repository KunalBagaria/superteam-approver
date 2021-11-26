import nodemailer from 'nodemailer'

const emailDetails = {
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
}

export default async (applier: string, emailToSend: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env['EMAIL_USER'],
            pass: process.env['EMAIL_PASS']
        }
    })
    // @ts-ignore
    const body: any = emailDetails[emailToSend]['body']
    // @ts-ignore
    const subject: any = emailDetails[emailToSend]['subject']

    const mailOptions = {
        from: 'hello@superteam.fun',
        to: applier,
        subject: subject,
        text: body
    };

    const response = await transporter.sendMail(mailOptions);
    return response
}