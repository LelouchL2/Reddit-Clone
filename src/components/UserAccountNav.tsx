import { User } from "next-auth";
import { FC } from "react";

interface UserAccountNavProps {
  user: Pick<User, "name" | "image" | "email">;
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  return <div>UserAccount</div>;
};

export default UserAccountNav;
