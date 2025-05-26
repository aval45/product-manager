export const validate = (schema) => async (req, res, next) => {
    try {
      const body = await req.body;
      await schema.validateAsync(body);
      next();
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
  };
  