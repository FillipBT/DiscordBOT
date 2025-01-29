import React, { useEffect } from "react";
import { CodeGrant } from "../ApiCalls/Authentication";

export default function Auth() {
  const queryParameters = new URLSearchParams(window.location.search);

  const code: string | null = queryParameters.get("code");

  useEffect(() => {
    console.log(code);
    if (!code) return;
    CodeGrant(code);
  }, []);

  return <div>Loading</div>;
}
