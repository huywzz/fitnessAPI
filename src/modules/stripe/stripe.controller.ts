/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StripeService } from './stripe.service';

@Controller('stripe')
@ApiTags('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}
}
