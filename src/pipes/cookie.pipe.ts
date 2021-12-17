const $cookie = (cookie: string) => {
    if (!cookie || cookie.length < 1) return {};
    return cookie.split(";").reduce((obj, cookie) => {
        const [key, value] = cookie.split("=");
        obj[key.trim()] = value.trim();
        return obj;
    }, {});
};

export default $cookie;
