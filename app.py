import os
import threading
import logging
from flask import Flask, send_from_directory, jsonify
from telegram import Update, WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, ContextTypes

logging.basicConfig(level=logging.INFO)
TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "").strip()
PUBLIC_URL = os.environ.get("WEB_APP_URL", "").strip().rstrip("/")
PORT = int(os.environ.get("PORT", "8080"))

app = Flask(__name__, static_folder="web", static_url_path="")

@app.get("/")
def home():
    return send_from_directory("web", "index.html")

@app.get("/health")
def health():
    return jsonify(status="ok", app="Solar Coin Mining demo")

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    text = (
        "☀️ Solar Coin Mining'e hoş geldin!\n\n"
        "SCN bu demo sürümünde yalnızca sanal oyun puanıdır; gerçek kripto para değildir."
    )
    if PUBLIC_URL.startswith("https://"):
        keyboard = InlineKeyboardMarkup([[
            InlineKeyboardButton("☀️ Madenciliği Aç", web_app=WebAppInfo(url=PUBLIC_URL))
        ]])
        await update.message.reply_text(text, reply_markup=keyboard)
    else:
        await update.message.reply_text(
            text + "\n\nMini App bağlantısı henüz ayarlanmamış. Yönetici WEB_APP_URL değişkenine "
            "yayındaki HTTPS adresini eklemeli."
        )

def run_bot():
    if not TOKEN:
        logging.warning("TELEGRAM_BOT_TOKEN tanımlı değil; web uygulaması çalışır, bot başlatılmaz.")
        return
    application = Application.builder().token(TOKEN).build()
    application.add_handler(CommandHandler("start", start))
    application.run_polling(drop_pending_updates=True)

if __name__ == "__main__":
    if TOKEN:
        thread = threading.Thread(target=run_bot, daemon=True)
        thread.start()
    else:
        logging.warning("TELEGRAM_BOT_TOKEN eksik; yalnızca web demo başlatılıyor.")
    app.run(host="0.0.0.0", port=PORT)
