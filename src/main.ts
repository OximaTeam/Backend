import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import helmet from "helmet";
import { ApiResponseFilter } from "./common/filters/errors.filter";
import { SuccessInterceptor } from "./common/interceptors/response.interseptor";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("API")
    .setDescription("Api of the Oxima's backend")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "Authorization",
        in: "header",
      },
      "jwt"
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use((req, res, next) => {
    if (req.path.startsWith("/api/docs")) {
      return helmet({ contentSecurityPolicy: false })(req, res, next);
    }
    helmet()(req, res, next);
  });

  app.setGlobalPrefix("api");

  app.use(
    "/api/docs",
    apiReference({
      content: document,
      theme: "default",
    })
  );

  app.useGlobalFilters(new ApiResponseFilter());
  app.useGlobalInterceptors(new SuccessInterceptor());

  await app.listen(
    process.env.BACK_PORT ?? 4040,
    process.env.IP_TYPE ?? "127.0.0.1"
  );
}

bootstrap();
