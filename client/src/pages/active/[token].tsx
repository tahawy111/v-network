import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface activeProps {}

export default function Active({}: activeProps) {
  const router = useRouter();
  const { token } = router.query;
  const [isActivated, setIsActivated] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        if (isActivated === true) return;
        const res = await axios.post(`${process.env.API}/api/auth/active`, {
          active_token: token,
        });
        setIsActivated(true);
      } catch (error) {
        return error;
      }
    }

    fetchData();
  }, [token, isActivated]);

  return (
    <>
      <Head>
        <title>Activate Account</title>
      </Head>

      <div className="flex justify-center flex-col items-center h-screen">
        <h1 className="text-center">Active Account</h1>
        <br />
        {isActivated === true ? (
          <>
            <h2 className="text-center text-green-400">
              Congratulations,
              <br /> Your account has been activated
            </h2>
            <br />
            <button
              onClick={() => router.push("/login")}
              className="btn-primary"
            >
              Go To Signin Screen And Siginin
            </button>
          </>
        ) : (
          <div>Activating...</div>
        )}
      </div>
    </>
  );
}
