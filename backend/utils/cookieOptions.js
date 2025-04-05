export const getCookieOptions = (req) => {
  const isProduction = process.env.NODE_ENV === "production";
  
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    domain: undefined, // Let the browser set the domain
    path: '/'
  };
};

export const getAccessCookieOptions = (req) => ({
  ...getCookieOptions(req),
  maxAge: 15 * 60 * 1000 // 15 minutes
});

export const getRefreshCookieOptions = (req) => ({
  ...getCookieOptions(req),
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
}); 