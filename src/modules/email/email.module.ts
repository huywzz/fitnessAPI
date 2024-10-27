import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          // For relay SMTP server set the host to smtp-relay.gmail.com
          // and for Gmail STMO server set it to smtp.gmail.com
          host: configService.get('MAIL_HOST'),
          // For SSL and TLS connection
          secure: true,
          port: 465,
          auth: {
            // Account gmail address
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAIL_PASS'),
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class MailModule {}
