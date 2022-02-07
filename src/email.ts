import nodemailer from 'nodemailer'

const template = (accepted: boolean): string => (
  `
Hello,

Thanks for applying for a Superteam Instagrant. ${accepted ? 'Happy to inform you that the grant application has been accepted, and you will receive the amount shortly. Until then, please fill in the grant onboarding form available at - https://airtable.com/shrR1FTUDMCoGFoSY.' : 'However, we regret to inform you that your project is not currently a good fit for us right now. We hope you apply again down the line.'}
${accepted ? '\nDM me at @neilshroff#2180 for your role to be changed to a Member (if not already a member) and for any other queries. \n' : ''}
Best,
Neil from Superteam
`
)

const emailDetails = (project: string) => ({
  Accepted: {
    subject: `Your InstaGrants application for ${project} has been approved!`,
    body: template(true)
  },
  Rejected: {
    subject: `Your InstaGrants application for ${project} has been rejected`,
    body: template(false)
  }
})

export default async (applier: string, project: string, emailToSend: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env['EMAIL_USER'],
      pass: process.env['EMAIL_PASS']
    }
  })
  const emailObject = emailDetails(project)
  // @ts-ignore
  const body: any = emailObject[emailToSend]['body']
  // @ts-ignore
  const subject: any = emailObject[emailToSend]['subject']

  const mailOptions = {
    from: 'hello@superteam.fun',
    to: applier,
    subject: subject,
    text: body
  };

  const response = await transporter.sendMail(mailOptions);
  return {
    response,
    body,
    subject
  }
}