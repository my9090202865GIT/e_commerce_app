import { FC, FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { doLogin, updateModal } from "../redux/features/authSlice";
import { FaUnlock } from "react-icons/fa";
import { RiLockPasswordFill, RiUser3Fill } from "react-icons/ri";
import { GiArchiveRegister } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import SignUp from "./SignUp";

const LoginModal = () => {
  const [clicked, setClicked] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const open = useSelector((state) => state.authReducer.modalOpen);

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(doLogin({ username, password }));
  };

  if (open) {
    return (
      <div className="bg-[#0000007d] w-full min-h-screen fixed inset-0 z-30 flex items-center justify-center font-karla">
        <div
          className="relative border shadow rounded p-8 bg-white max-w-md w-full z-40"
          data-test="login-container"
        >
          <RxCross1
            className="absolute cursor-pointer right-5 top-5 hover:opacity-85"
            onClick={() => {
              setClicked(false);
              dispatch(updateModal(false))
            }}
          />
          {clicked ? (
            <>
              <div className="flex mb-2 space-x-2 justify-center items-center">
                <GiArchiveRegister />
                <h3 className="font-bold text-center text-xl">Register</h3>
                <GiArchiveRegister />
              </div>
              <SignUp closehandler={() => setClicked(false)} />
              <p className="leading-4">
                <span
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={() => setClicked(false)}
                >
                  Go to login
                </span>
              </p>
            </>
          ) : (
            <>
              <div className="flex mb-2 space-x-2 justify-center items-center">
                <FaUnlock />
                <h3 className="font-bold text-center text-2xl">Login</h3>
                <FaUnlock />
              </div>
              <form onSubmit={submitForm} className="flex flex-col space-y-3">
                <div className="relative">
                  <input
                    data-test="input-username"
                    type="text"
                    placeholder="Your username here... "
                    className="border w-full border-black py-2 px-8 rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <RiUser3Fill className="absolute top-3 left-2 text-lg" />
                </div>
                <div className="relative">
                  <input
                    data-test="input-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Your password here... "
                    className="border w-full border-black py-2 px-8 rounded"
                  />
                  <RiLockPasswordFill className="absolute top-3 left-2 text-lg" />
                </div>
                <input
                  data-test="input-submit"
                  type="submit"
                  value="Submit"
                  className="bg-blue-500 text-white rounded p-2 hover:bg-blue-700 cursor-pointer"
                />
              </form>
              <p className="text-center mt-1">
                No Account?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setClicked(true)}
                >
                  Register
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }
};

export default LoginModal;
