import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  IconButton,
} from "@material-tailwind/react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { useChangePasswordMutation } from "../../../redux/endpoints/userauth";
import { LoginSchema } from "./validations";
import { LoadingSpinner } from "../../shared/spinners/LoadingSpinner";
import { MdClose } from "react-icons/md";

const initialValues = {
  email: "",
  password: "",
};

function ChangepPasswordmodel({
  ShowpasswordchangeModel,
  setShowpasswordchangeModel,
}) {
  const [Changepassword, { isLoading }] = useChangePasswordMutation();

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: async (userinfo, action) => {
      try {
        const response = await Changepassword(userinfo).unwrap();
        const { message, status } = response;

        if (status === "success") {
          action.resetForm();
          setShowpasswordchangeModel(false);
          toast.success(message);
        }
      } catch (error) {
        console.log("🚀 ~ onSubmit: ~ error:", error)
        if (error.data.status === "failed") {
          setShowpasswordchangeModel(false);
          toast.error(error.data.message);
        }
      }
    },
  });


  return createPortal(
    <section>
      <Dialog
        id="passwordchangemodel"
        size="xs"
        open={ShowpasswordchangeModel}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem] text-white bg-black border border-white">
          <form onSubmit={handleSubmit}>
            <CardBody className="flex flex-col gap-4">
              <div className="flex justify-between">
                <Typography variant="h4" className="text-center">
                  CHANGE PASSWORD
                </Typography>
                <IconButton onClick={() => setShowpasswordchangeModel(false)}>
                  <MdClose className="size-8" />
                </IconButton>
              </div>
              <Typography className="-mb-2" variant="h6">
                Your Email
              </Typography>

              <Input
                label="Email"
                size="lg"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              <p className="text-[0.9rem] mx-1 font-Roboto text-deep-orange-800">
                {errors?.email}
              </p>
              <Typography className="-mb-2" variant="h6">
                New Password
              </Typography>
              <Input
                label="Password"
                type="password"
                size="lg"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
              <p className="text-[0.9rem] mx-1 font-Roboto text-deep-orange-800">
                {errors?.password}
              </p>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                type="submit"
                className="mt-6 bg-secondary-400 flex-center text-black text-xl"
                fullWidth
              >
                {isLoading ? <LoadingSpinner /> : "CONFIRM"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </section>,
    document.getElementById("dialog-root")
  );
}
export default ChangepPasswordmodel;
