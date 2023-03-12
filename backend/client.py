import os
from realtime.connection import Socket
from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.

SUPABASE_ID = os.getenv('SUPABASE_ID')
SUPABASE_API_KEY = os.getenv('SUPABASE_API_KEY')



def callback1(payload):
    print("Callback 1: ", payload)

if __name__ == "__main__":
    URL = f"wss://{SUPABASE_ID}.supabase.co/realtime/v1/websocket?apikey={SUPABASE_API_KEY}&vsn=1.0.0"
    s = Socket(URL)
    s.connect()

    channel_1 = s.set_channel("realtime:public:controls")
    channel_1.join().on("UPDATE", callback1)
    s.listen()