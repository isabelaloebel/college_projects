import pika
import time
import random

def on_message_received(ch, method, properties, body):
    processing_time = random.randint(1, 6)
    print(f"Consumer received: {body}, will take {processing_time} seconds to process")
    time.sleep(processing_time)
    ch.basic_ack(delivery_tag=method.delivery_tag)
    print("Consumer finished processing the message")

    ch.basic_publish(exchange='message_consumed',
                     routing_key='',
                     body=body)

connection_parameters = pika.ConnectionParameters('localhost')
connection = pika.BlockingConnection(connection_parameters)
channel = connection.channel()

channel.queue_declare(queue='letterbox')
channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='letterbox', on_message_callback=on_message_received)

channel.exchange_declare(exchange='message_consumed', exchange_type='fanout')

print("Consumer started consuming")

channel.start_consuming()
