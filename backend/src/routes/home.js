import { Router } from "express";

const router = Router();
router.get('/', (request, response) => {
  console.log(request.session.id);
  console.log(request.user);
  response.status(201).send('Welcome to harmony drug database')
})
export default router;

