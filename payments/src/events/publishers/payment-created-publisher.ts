import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from "@madhavtickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
