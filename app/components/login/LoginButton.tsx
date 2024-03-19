import { Google } from "@mui/icons-material";
import { Button, Typography } from "@mui/joy";
import { googleAuth } from "@/app/helpers/googleAuth";

const LoginButton = () => {
  const oauth2Client = googleAuth();

  // generate a url that asks permissions for Blogger and Google Calendar scopes
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile"
  ];

  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: "offline",

    // If you only need one scope you can pass it as a string
    scope: scopes
  });

  return (
    <>
      <Typography level="body-sm" mb={2}>
        Login with google to start chatting
      </Typography>
      <Button
        startDecorator={<Google />}
        component="a"
        href={url}
        target="_blank"
      >
        Login with google
      </Button>
    </>
  );
};

export default LoginButton;
