import rateLimit from 'express-rate-limit';

/**
 * Returns rate limiting middleware that prevents more than `limit` requests per IP
 * within a given time window of `windowMs` milliseconds.
 *
 * @param {number} windowMs - The time window in milliseconds
 * @param {number} limit - The max number of requests per IP within the given time window
 * @param {string} [message] - The message to be sent when rate limit is exceeded
 */
/*******  28dd5fc2-a305-4c7c-aa61-c64b8e96261e  *******/  
export function apiRateLimiter(windowMs: number, limit: number,message:string) {
  return rateLimit({
    windowMs: windowMs, // time window in milliseconds
    max: limit, // limit each IP to 'limit' requests per windowMs
    message: { message: message || 'Too many requests, please try again later.' },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
}

export const globalRateLimiter = apiRateLimiter(60 * 1000, 30, 'Too many requests from this IP, please try again after 1 minutes.');
export const authRateLimiter = apiRateLimiter(10 * 60 * 1000, 5, 'Too many login attempts from this IP, please try again after 15 minutes.');