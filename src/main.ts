import { Loader } from './loader';
import { AppModule } from './app.module';

async function bootstrap() {
  const loader = await Loader.create(AppModule);

  loader.setStaticFiles().setSwagger().runServer();
}

bootstrap();
