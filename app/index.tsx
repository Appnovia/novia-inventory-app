// import { SESSION_KEY, useAuth } from "@/hooks/auth";
import { getItem } from "@/hooks/storage";
import { Redirect } from "expo-router";
import React from "react";

export default function Index() {
  const [loaded, setLoaded] = React.useState(false);
  const [onboarding, setOnboarding] = React.useState(false);

  React.useEffect(() => {
    getItem("onboarding").then((value) => {
      if (value) {
        setOnboarding(true);
      }
      setLoaded(true);
    });
  }, []);
  if (!loaded) return null;
  return onboarding === true ? (
    <Redirect href="/(routes)/login" />
  ) : (
    <Redirect href="/(routes)/onboarding" />
  );
}
