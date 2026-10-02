import requests
from rich.console import Console
from rich.table import Table


def fetch_swapi_data():

    url = "https://swapi.info/api/planets"

    try:
        response = requests.get(url)
        response.raise_for_status()

        data = response.json()

        # create Rich console
        console = Console()

        # create a table
        table = Table(title="Star Wars Planets")

        # create columns
        table.add_column("Planet Name",style="red")
        table.add_column("Diameter",style="blue")
        table.add_column("Population",style="green")

        # go through every planet
        for planet in data:
            table.add_row(
                planet["name"],
                planet["diameter"],
                planet["population"]
            )

        # print the table
        console.print(table)

        return data

    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return None


fetch_swapi_data()