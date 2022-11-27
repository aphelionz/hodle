import datetime
import json
import os
import random

from requests import get


def ensure_new_selection(listings, history):
    still_searching = True
    while still_searching:
        selection = random.choice(listings)
        symbol = selection.get('symbol')
        still_searching = bool(history.count(symbol) > 0)

    return (selection, symbol)


def get_latest_cmc_listings():
    """
    Gets the latest listings from coinmarketcap.

    Same thing in curl:

    curl \
      -H "X-CMC_PRO_API_KEY: ${API_KEY}" \
      -H "Accept: application/json" \
      -d "start=1&limit=5000&convert=USD" \
      -G https://sandbox-api.coinmarketcap.com/...
    """

    cmc_api_key = os.getenv('CMC_API_KEY')
    cmc_api_domain = os.getenv('CMC_API_DOMAIN')
    headers = {
        "Accept": "application/json",
        "X-CMC_PRO_API_KEY": cmc_api_key
    }

    endpoint = "/v1/cryptocurrency/listings/latest"
    response = get(f"{cmc_api_domain}{endpoint}", headers=headers, timeout=10)
    json = response.json()

    return json['data']


def read_coin_json_history():
    with open('coins.json', 'r', encoding="utf-8") as jsonfile:
        coins = json.load(jsonfile)

    return coins.get('history', [])


def write_coins_json(selection, history):
    coins_json = {
        "todays_coin": {
            "timestamp": utcnow.isoformat(),
            "data": selection
        },
        "history": history
    }

    with open('coins.json', 'w', newline='', encoding="utf-8") as jsonfile:
        json.dump(coins_json, jsonfile)


if __name__ == "__main__":
    utcnow = datetime.datetime.utcnow()

    listings = get_latest_cmc_listings()
    history = read_coin_json_history()

    (selection, symbol) = ensure_new_selection(listings, history)
    history.append(symbol)

    assert len(set(history)) == len(history), 'history elements not unique'

    write_coins_json(selection, history)
