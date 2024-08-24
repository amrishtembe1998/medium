import { Link, useNavigate } from "react-router-dom";
import { InputBox } from "./InputBox";
import { useState } from "preact/hooks";
import axios from "axios";
import { SignUpSchema } from "@amrishtembe1998/medium-common";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "Sign Up" | "Sign In" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignUpSchema>({
    name: "",
    email: "",
    password: "",
  });
  async function sendRequest(postInputs: SignUpSchema) {
    console.log("********", JSON.stringify(postInputs));
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${
          type === "Sign Up" ? "signup" : "signin"
        }`,
        postInputs
      );
      const jwt = response.data.jwtToken;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      alert(`Error while signing up: ${error}`);
    }
  }
  return (
    <div className="h-screen justify-center flex items-center text-center">
      <div>
        <div className="text-4xl font-extrabold px-10">Create an account</div>
        <div className="text-slate-400">
          {type === "Sign Up"
            ? "Already have an account?"
            : "Don't have an account?"}

          <Link
            className="underline pl-1 text-sm"
            to={type === "Sign Up" ? "/signin" : "/signup"}
          >
            {type === "Sign Up" ? "Sign In" : "Sign Up"}
          </Link>
          {type === "Sign Up" ? (
            <InputBox
              label={"Name"}
              placeholder={"John Doe"}
              onChange={(e: { target: { value: any } }) => {
                setPostInputs({
                  ...postInputs,
                  name: e.target.value,
                });
              }}
            ></InputBox>
          ) : null}
          <InputBox
            label={"Username"}
            placeholder={"example@example.com"}
            onChange={(e: { target: { value: any } }) => {
              setPostInputs({
                ...postInputs,
                email: e.target.value,
              });
            }}
          ></InputBox>
          <InputBox
            label={"Password"}
            placeholder={"password"}
            type="password"
            onChange={(e: { target: { value: any } }) => {
              setPostInputs({
                ...postInputs,
                password: e.target.value,
              });
            }}
          ></InputBox>
          <div className="pt-5">
            <button
              onClick={() => sendRequest(postInputs)}
              class="w-full bg-transparent hover:bg-slate-800 text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded"
            >
              {type}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
