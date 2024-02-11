import { app } from './app'
import { mqWorkerRun } from '@shared/infra/mq/mq-worker-run'

const port: number = parseInt(process.env.PORT ?? '3333', 10);

app.listen(port, "0.0.0.0", () => console.log(`Server is running in port ${port}`))

// mqWorkerRun()
