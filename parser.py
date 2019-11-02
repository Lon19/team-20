import json


def reduce_json(json_filename):
    with open(json_filename, "r") as f:
        api_data = json.loads(f)
        observations = api_data["obs"]

        d = {}
        for record in observations:
            d[record["geography"]["geogcode"]] = record["obs_value"]["value"]

        processed_json = json.dumps(d)


def main():
    # reduce_json()
    pass


if __name__ == "__main__":
    main()
