import pika
import json

def callback(ch, method, properties, body):
    tweet = json.loads(body)
    print(f" [x] Tweet de {tweet['author']} [{tweet['timestamp']}]: {tweet['content']}")

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

channel.queue_declare(queue='twitter_feed')

print(' [*] Feed do Twitter:')
channel.basic_consume(queue='twitter_feed',
                      on_message_callback=callback,
                      auto_ack=True)



channel.start_consuming()

