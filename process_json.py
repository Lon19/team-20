import json


def process_json(json_filename):
    with open(f"{json_filename}.json", "r") as f:
        api_data = json.load(f)
        observations = api_data["obs"]

        d = {}
        for record in observations:
            d[record["geography"]["description"]] = record["obs_value"]["value"]

        with open(f"{json_filename}_description_processed.json", "w") as outfile:
            json.dump(d, outfile)


def main():
    process_json("data")


if __name__ == "__main__":
    main()
