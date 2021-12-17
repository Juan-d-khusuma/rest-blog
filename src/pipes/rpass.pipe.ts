import { User } from "@prisma/client";

// A helper pipe to remove the password from the user object
const $rpass = (user: User) => {
    /* eslint-disable no-unused-vars */
    const { password, ...rest } = user;
    return rest;
};

export default $rpass;
