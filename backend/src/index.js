import 'dotenv/config';
import express from 'express';
import routes from './routes';

if (!process.env.PORT) {
    console.error('Please set PORT environment variable');
    process.exit(1);
}

const port = process.env.PORT;

const app = express();
app.set('json spaces', 2);
app.use(express.json());

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});

app.use('/', routes);

export default app;
