from doctest import master
from multiprocessing import connection
import pika
import json
import customtkinter
from datetime import datetime
import threading
import sys

customtkinter.set_appearance_mode("dark")
customtkinter.set_appearance_mode("dark-blue")

root = customtkinter.CTk()
root.geometry("500x750")
frame = customtkinter.CTkScrollableFrame(master=root)
frame.pack(pady=5, padx=5, fill="both", expand=True)

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()
channel.queue_declare(queue='twitter_feed')

def callback(ch, method, properties, body):
    tweet = json.loads(body)
    print(f" [x] Tweet de {tweet['author']} [{tweet['timestamp']}]: {tweet['content']}")
    l = customtkinter.CTkLabel(master=frame, width=470,text="@" + tweet["author"] + " ["+ tweet["timestamp"] +"]: " + tweet["content"], anchor='w')
    l.pack()


def login(user):
    username = user.get()
    print("Usuario conectado: ", username)

    channel.basic_consume(queue='twitter_feed',
                      on_message_callback=callback,
                      auto_ack=True)
    threading.Thread(target=channel.start_consuming).start()
    delete_page()
    feed_page(username)
    
    
def login_page():
    label = customtkinter.CTkLabel(master=frame, text="Login")
    label.pack(pady=12, padx=10)

    user = customtkinter.CTkEntry(master=frame, placeholder_text="Username")
    user.pack(pady=12, padx=10)
    
    button = customtkinter.CTkButton(master=frame, text="Login", command=lambda: login(user))
    button.pack(pady=12, padx=10)


def delete_page():
    for info in frame.winfo_children():
        info.destroy()


def feed_page(username):
    entry = customtkinter.CTkEntry(master=root, placeholder_text="text here", width=350)
    entry.pack(pady=5)

    send = customtkinter.CTkButton(master=root, text="Send", command=lambda: new_tweet(entry, username), width=100)
    send.pack(side='bottom', pady=10)



def new_tweet(entry, username):
    content = entry.get()
    tweet = {
        "author": username,
        "content": content,
        "timestamp": datetime.now().strftime('%d-%m-%Y - %H:%M')
    }
    print("autor: ", tweet["author"])
    print("time: ", tweet["timestamp"])
    print("content: ", tweet["content"])

    # l = customtkinter.CTkLabel(master=frame, width=470,text="@" + tweet["author"] + " ["+ tweet["timestamp"] +"]: " + tweet["content"], anchor='w')
    # l.pack()

    channel.basic_publish(exchange='',
                        routing_key='twitter_feed',
                        body=json.dumps(tweet))
    entry.delete(0, customtkinter.END)

login_page()
print('ch:',channel)
sys.exit(root.mainloop())