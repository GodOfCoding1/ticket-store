import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from "@madhavtickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
