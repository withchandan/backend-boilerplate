import { createApp } from './app';
import { Logger } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const PORT = 9090;
  const app = await createApp();

  await app.init();
  await app.listen(PORT);

  Logger.log(`Application server started on port ${PORT}`);
}

bootstrap();

export { bootstrap };
