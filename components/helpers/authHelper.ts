import jwt_decode from "jwt-decode";

interface AccessToken {
  id: number;
  email: string;
  user_id: string;
  username: string;
  designation: string;
  iat: string;
  exp: number;
  roles: string[];
  permissions: string[];
  tenants: string[];
  discord_id: string;
  random?: string;
}

export const bearerToken = () => {
  try {
    return JSON.parse(localStorage.getItem("logged_in_info")!)
      ? JSON.parse(localStorage.getItem("logged_in_info")!).access_token
      : null;
  } catch (err) {
    return "";
  }
};

export const refreshToken = () => {
  try {
    return JSON.parse(localStorage.getItem("logged_in_info")!)
      ? JSON.parse(localStorage.getItem("logged_in_info")!).refresh_token
      : null;
  } catch (err) {
    return "";
  }
};

export const login = (data: object) => {
  console.log("data", data);
  try {
    localStorage.setItem("logged_in_info", JSON.stringify(data));
  } catch (err) {
    console.log("Error in login", err);
  }
};

export const setPermission = (data: object) => {
  console.log("data", data);
  try {
    localStorage.setItem("permissions", JSON.stringify(data));
  } catch (err) {
    console.log("Error in login", err);
  }
};

export const getPermissions = () => {
  try {
    const info = JSON.parse(localStorage.getItem("permissions")!);
    return info;
  } catch (err) {
    return null;
  }
};

export const isPermitted = (module: string, permission: string) => {
  try {
    const info = JSON.parse(localStorage.getItem("permissions")!);
    const permit = info.find((p: any) => p.module == module);
    if (permit) {
      const p = permit.permissions.includes(permission);
      return p;
    } else {
      return false;
    }
  } catch (err) {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("logged_in_info");
};

export const removePermissions = () => {
  localStorage.removeItem("permissions");
};

export const getCurrentUser = () => {
  try {
    const info = JSON.parse(localStorage.getItem("logged_in_info")!);
    const decodedJwt = jwt_decode<AccessToken>(info.access_token);
    return decodedJwt;
  } catch (err) {
    return null;
  }
};

export const getCurrentUserId = () => {
  const user = getCurrentUser();
  if (user) return user.user_id;
  else return null;
};

export const getCurrentUserDiscordId = () => {
  const user = getCurrentUser();
  if (user) return user.discord_id;
  else return null;
};

export const isLoggedIn = () => {
  const logged_in_info = JSON.parse(localStorage.getItem("logged_in_info")!);
  if (logged_in_info) {
    //&& isValidSession()
    return true;
  } else {
    return false;
  }
};

export const isValidSession = () => {
  const logged_in_info = JSON.parse(localStorage.getItem("logged_in_info")!);
  if (logged_in_info) {
    const decodedJwt = jwt_decode<AccessToken>(logged_in_info.access_token);
    if (decodedJwt.exp * 1000 < Date.now()) {
      return false;
    } else {
      return true;
    }
  }
};

export const getCurrentUserPhoto = () => {
  const logged_in_info = JSON.parse(localStorage.getItem("logged_in_info")!);
  if (logged_in_info) {
    const decodedJwt: any = jwt_decode<AccessToken>(logged_in_info.access_token);
    return decodedJwt?.photo;
  } else {
    return null;
  }
};

export const getCurrentUserTenants = () => {
  const logged_in_info = JSON.parse(localStorage.getItem("logged_in_info")!);
  if (logged_in_info) {
    const decodedJwt = jwt_decode<AccessToken>(logged_in_info.access_token);
    return decodedJwt.tenants[0];
  } else {
    return 0;
  }
};

export const getCurrentUserRole = () => {
  const logged_in_info = JSON.parse(localStorage.getItem("logged_in_info")!);
  if (logged_in_info) {
    const decodedJwt = jwt_decode<AccessToken>(logged_in_info.access_token);
    // console.log(decodedJwt.roles);
    return decodedJwt.roles;
  } else {
    return null;
  }
};
