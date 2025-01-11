/**
 * authentication route
 */

import { Router } from 'express';
import passport from 'passport';
import '../../utils/strategies/localStrategy.js';

const router = Router();

router.post(
  '/login/',
  passport.authenticate('local'),
  (error, request, response, next) => {
    if (error) {
      return response.status(401).json({ authenticated: false });
    }
    next();
  },
  (request, response) => {
    return response.status(200).json({
      authenticated: true
     });
  }
);

router.get('/status/', (request, response) => {
  if (request.isAuthenticated()) {
    return response.status(200).json({
      authenticated: true,
      user: request.user
     });
  } else {
    return response.status(200).json({ authenticated: false });
  }
});

router.post('/logout/', (request, response) => {
  if (!request.user) {
    return response.status(401).json('no user logged in');
  }
  request.logOut((error) => {
    if (!error) {
      return response.status(200).json({ status: 'Logged out successfully' });
    } else {
      return response.status(400).json(error);
    }
  });
});

export default router;
