/**
 * authentication route
 */

import { Router } from 'express';
import passport from 'passport';
import '../../utils/strategies/localStrategy.js';

const router = Router();

router.post('/login/', passport.authenticate('local'), (request, response) => {
  console.log(request.session);
  return response
    .status(200)
    .json({ status: 'Ok' });
});

export default router;
