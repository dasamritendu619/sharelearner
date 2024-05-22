import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail=async function (mailType,email,fullName) {
  const { data, error } = await resend.emails.send({
    from: 'sharelearner <onboarding@resend.dev>',
    to: [email],
    subject: 'Hello World',
    html: '<strong>It works!</strong>',
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
};
export {sendMail}
