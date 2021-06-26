import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger'
import * as fs from 'fs'
import * as path from 'path'
import { Env } from '@humanwhocodes/env'

import { AppModule } from './app.module'
import ExceptionHandlingFilter from './filters/ExceptionHandlingFilter'

const pkg = JSON.parse(fs.readFileSync('../package.json', 'utf-8'))
const env = new Env()
const port = env.get('PORT', '3000')

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new ExceptionHandlingFilter())
  app.useGlobalPipes(
    new ValidationPipe({
      validationError: {
        value: false,
      },
      skipMissingProperties: false,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  const config = new DocumentBuilder()
    .setTitle(pkg.name)
    .setDescription(pkg.description)
    .setVersion(pkg.version)
    .setContact(pkg.authors[0].name, pkg.authors[0].url, pkg.authors[0].email)
    .addTag('lists', 'API operations for the `List` resources')
    .addTag('items', 'API operations for the `Item` resources')
    .build()

  const options: SwaggerDocumentOptions = {
    include: [AppModule],
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  }

  const appDocs = SwaggerModule.createDocument(app, config, options)
  const outputPath = path.resolve(process.cwd(), 'open-api.json')
  fs.writeFileSync(outputPath, JSON.stringify(appDocs, null, 2), {
    encoding: 'utf8',
  })

  SwaggerModule.setup('docs', app, appDocs)

  await app.listen(port, () =>
    console.log(`${pkg.name}@${pkg.version} listening on ${port}`),
  )
}

bootstrap()
