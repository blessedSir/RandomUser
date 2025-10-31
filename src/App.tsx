import { Box } from "@mui/system";
import "./App.css";
import { Button, Container, Divider, Skeleton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useEffect, useState } from "react";

type dob = { age: number; date: string };
type id = { name: string; value: string };
type location = {
  city: string;
  coordinates: { latitude: string; longitude: string };
  country: string;
  postcode: number;
  state: string;
  street: { name: string; number: number };
  timezone: { description: string; offset: string };
};
type User = {
  gender: string;
  cell: string;
  dob: dob;
  email: string;
  id: id;
  location: location;
  login: {
    md5: string;
    password: string;
    salt: string;
    sha1: string;
    sha256: string;
    username: string;
    uuid: string;
  };
  name: { first: string; last: string; title: string };
  nat: string;
  phone: string;
  picture: { large: string; medium: string; thumbnail: string };
  registred: { age: number; date: string };
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(false);

  const getUser = (): void => {
    setLoading(true);
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((data) => {
        setUser(data.results[0]);
        setLoading(false);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container disableGutters maxWidth="sm">
      <Box className="card">
        <Box className="header">
          <Box className="user-info">
            {isLoading ? (
              <Skeleton variant="circular" width={70} height={70} />
            ) : (
              <img
                className="avatar"
                src={user?.picture?.medium}
                alt="User avatar"
              />
            )}

            <Box className="user-text">
              {isLoading ? (
                <>
                  <Skeleton variant="text" width={201} height={24} />
                  <Skeleton variant="text" width={201} height={24} />
                </>
              ) : (
                <>
                  <span>{user?.name?.first}</span>
                  <span className="truncated-text">{user?.email}</span>
                  <span className="tooltip-text">{user?.email}</span>
                </>
              )}
            </Box>
          </Box>

          <Button className="refresh-btn" onClick={() => getUser()}>
            <RefreshIcon />
          </Button>
        </Box>

        <Divider className="divider" />

        <Box className="info-row">
          <span>Gender</span>
          {isLoading ? (
            <Skeleton variant="text" width="15%" />
          ) : (
            <span>{user?.gender}</span>
          )}
        </Box>

        <Divider className="divider" />

        <Box className="info-row">
          <span>Name</span>
          {isLoading ? (
            <Skeleton variant="text" width="20%" />
          ) : (
            <span>{user?.name?.first}</span>
          )}
        </Box>

        <Divider className="divider" />

        <Box className="info-row">
          <span>Last Name</span>
          {isLoading ? (
            <Skeleton variant="text" width="20%" />
          ) : (
            <span>{user?.name?.last}</span>
          )}
        </Box>

        <Divider className="divider" />

        <Box className="info-row">
          <span>Nationality</span>
          {isLoading ? (
            <Skeleton variant="text" width="10%" />
          ) : (
            <span>{user?.nat}</span>
          )}
        </Box>

        <Divider className="divider" />

        <Box className="info-row">
          <span>Email account</span>
          {isLoading ? (
            <Skeleton variant="text" width="50%" />
          ) : (
            <>
              <span className="truncated-text-row">{user?.email}</span>
              <span className="tooltip-text-row">{user?.email}</span>
            </>
          )}
        </Box>

        <Divider className="divider" />

        <Box className="info-row">
          <span>Mobile number</span>
          {isLoading ? (
            <Skeleton variant="text" width="30%" />
          ) : (
            <span>{user?.phone}</span>
          )}
        </Box>

        <Divider className="divider" />

        <Box className="info-row">
          <span>Location</span>
          <Box className="location">
            {isLoading ? (
              <>
                <Skeleton variant="text" width={100} />
                <Skeleton variant="text" width={100} />
                <Skeleton variant="text" width={100} />
              </>
            ) : (
              <>
                <span>{user?.location?.country}</span>
                <span>{user?.location?.state}</span>
                <span>{user?.location?.city}</span>
              </>
            )}
          </Box>
        </Box>

        <Divider className="divider" />

        <Button className="main-btn" onClick={() => getUser()}>
          Refresh
        </Button>
      </Box>
    </Container>
  );
}

export default App;
