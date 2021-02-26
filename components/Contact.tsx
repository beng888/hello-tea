import tw from "twin.macro";
import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Button from "./Button";
import { useForm, Controller } from "react-hook-form";
import FormField from "./FormField";

interface FormData {
  name: string;
  email: string;
  message: string;
  token: string;
}

interface Props {
  about: boolean;
  setMessageSent: Function;
  messageSent: boolean;
}

const Contact = React.forwardRef<HTMLDivElement, Props>(
  ({ about, setMessageSent, messageSent }, contactRef) => {
    const {
      register,
      handleSubmit,
      errors,
      control,
      reset,
    } = useForm<FormData>();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [serverErrors, setServerErrors] = useState<Array<string>>([]);
    const reRef = useRef<ReCAPTCHA>();
    const [show, setShow] = useState(false);

    const onSubmit = async (formData, e) => {
      setServerErrors([]);
      setSubmitting(true);

      reRef.current.reset();

      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          token: formData.token,
        }),
      });
      const data = await response.json();

      if (data.errors) {
        setServerErrors(data.errors);
      } else {
        e.target.reset();
        console.log(data);
        setSubmitting(false);
        setMessageSent(true);
        setTimeout(() => {
          setShow(true);
        }, 2000);
      }
    };

    if (messageSent) {
      return (
        <div tw="w-full h-full grid place-content-center z-40">
          <p
            tw="background[#E0FEC7] p-4 text-xs"
            className={`duration-1000 ${show ? "opacity-100" : "opacity-0"}`}
          >
            Thanks for contacting us! We will be in touch with you shortly.
          </p>
        </div>
      );
    } else {
      return (
        <div
          ref={contactRef}
          tw="w-full h-full z-10 relative padding-right[3vw] opacity-0 transform translate-y-6"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            tw="h-full flex flex-col justify-center gap-8 text-white md:max-w-sm font-family['Merriweather', serif]"
          >
            {serverErrors && (
              <ul>
                {serverErrors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}

            <FormField errors={errors?.name} message={errors?.name?.message}>
              <input
                type="text"
                ref={register({ required: "This field is required" })}
                id="name"
                name="name"
                placeholder="Name"
                tw="w-full"
              />
            </FormField>

            <FormField errors={errors?.email} message={errors?.email?.message}>
              <input
                type="email"
                ref={register({ required: "This field is required" })}
                id="email"
                name="email"
                placeholder="Email"
                tw="w-full"
              />
            </FormField>

            <FormField
              errors={errors?.message}
              message={errors?.message?.message}
            >
              <textarea
                id="comment"
                ref={register({
                  required: "This field is required",
                  minLength: {
                    value: 8,
                    message: "must be atleast 8 chars",
                  },
                })}
                rows={5}
                name="message"
                placeholder="Comment or Message"
                tw="w-full"
              ></textarea>
            </FormField>

            <div>
              <Controller
                control={control}
                name="token"
                rules={{ required: "Please verify that you're not a robot" }}
                defaultValue="false"
                render={(props) => (
                  <ReCAPTCHA
                    {...props}
                    ref={reRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    size={`${window.innerWidth < 360 ? "compact" : "normal"}`}
                  />
                )}
              />
              {errors.token ? (
                <div tw="text-red-700 text-sm absolute pt-1">
                  {errors.token.message}
                </div>
              ) : null}
            </div>

            <button
              disabled={submitting}
              className={`relative px-20 py-3 w-fit h-fit group ${
                submitting && "opacity-30"
              }`}
            >
              <Button>Submit</Button>
            </button>
          </form>
        </div>
      );
    }
  }
);

export default Contact;
