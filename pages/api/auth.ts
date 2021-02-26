import { NextApiRequest, NextApiResponse } from "next";

interface FormData {
  name: string;
  email: string;
  message: string;
  token: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const formData: FormData = req.body;

  const human = await validateHuman(formData.token);
  if (!human) {
    res.status(400);
    res.json({ errors: ["Sorry we don't talk to robots :)"] });
    return;
  } else {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_NO_CODE_API, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify([
          [
            formData.name,
            formData.email,
            formData.message,
            new Date().toLocaleString(),
          ],
        ]),
      });
      await response.json();

      res.status(201);
      res.json({ message: "Message Sent!" });
    } catch (err) {
      console.log(err);
    }
  }
};

async function validateHuman(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    {
      method: "POST",
    }
  );
  const data = await response.json();
  return data.success;
}
