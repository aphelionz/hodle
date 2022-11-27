all: install lint coins.json

clean:
	rm coins.json

coins.json:
	poetry run python scripts/todays_coin.py

install:
	poetry install

lint:
	poetry run flake8
	poetry run prospector

.PHONY: lint
