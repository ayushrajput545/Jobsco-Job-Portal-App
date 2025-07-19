
import nodemailer from 'nodemailer'

export async function POST(req) {
  try {
    const { email, message } = await req.json()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: email,  // sender email
      to: process.env.SENDER_EMAIL, // reciver email (not sender)
      subject: 'Bug Report-JOBSCO',
      html: `<p>${message}</p>`,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Email sending failed:', error)
    return Response.json({ error: 'Email failed' }, { status: 500 })
  }
}
