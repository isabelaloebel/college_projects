import pika
import json
from datetime import datetime

print('username:')
username = input()

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

channel.queue_declare(queue='twitter_feed')

while(True):
    content = input()
    tweet = {
        "author": username,
        "content": content,
        "timestamp": datetime.now().isoformat()
    }

    channel.basic_publish(exchange='',
                        routing_key='twitter_feed',
                        body=json.dumps(tweet))

    print(f" [x] Tweet publicado: {tweet['content']}")

connection.close()
