"use server";

let nodemailer = require("nodemailer");
let aws = require("@aws-sdk/client-ses");

export const sendNewEmail = async (to: string, attachments: any[]) => {
  const AWS_ACCESS_KEY_ID = process.env._AWS_ACCESS_KEY_ID || "access";
  const AWS_SECRET_ACCESS_KEY = process.env._AWS_SECRET_ACCESS_KEY || "secret";

  const FROM_ADDRESS = "criiscz08@gmail.com";
  const TO_ADDRESS = to || "criiscz08@gmail.com";

  const ses = new aws.SES({
    apiVersion: "2010-12-01",
    region: "us-east-2",
    credentials: {
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      accessKeyId: AWS_ACCESS_KEY_ID,
    },
  });

  let transporter = nodemailer.createTransport({
    SES: { ses, aws },
  });

  const attachmentsConverted = await Promise.all(
    attachments.map(async (attachment) => {
      const blob = attachment.get("blob");
      return {
        filename: blob.name,
        content: Buffer.from(await blob.arrayBuffer()),
      };
    })
  );

  transporter.sendMail(
    {
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      subject: "📦 Inventario actualizado - " + new Date().toLocaleDateString(),
      text:
        "Hola,\n\nSe ha enviado un documento con todos los productos del inventario adjunto a este correo.\n\nSaludos,\nEquipo de Inventario",
      attachments: attachmentsConverted,
    },
    (err: any, info: any) => {
      if (err) {
        console.error("Error al enviar el correo:", err);
      } else {
        console.log("Correo enviado con éxito:", info);
      }
    }
  );
};
