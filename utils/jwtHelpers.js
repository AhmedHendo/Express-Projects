import jwt from 'jsonwebtoken';

export const jwtTokens = ({ user_id }) => {
    const user = { user_id };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '40s'});
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '5m'});
    return ({ accessToken, refreshToken });
};