import nodemailer from "nodemailer";

const sendMail = async (mailData: object) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.SENDER_EMAIL}`,
      pass: "mwigegzkbjjmgpmc",
    },
  });

  try {
    const res = await transport.sendMail(mailData);
    return res;
  } catch (error) {
    return error;
  }
};

export default sendMail;
