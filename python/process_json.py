import json


def process_json(json_filename="", geography="geogcode", params=[], out_file=None):
    """
    Function processes an API response from Nomis in json format.

    Function takes arguments:
        1) json_filename STRING - path to json file (not including .json extension) 
        2) geography STRING - format for the location. One of: "geogcode", "description", "value"
        3) params LIST - takes a list of strings that are additional features of the dataset.
        4) out_file STRING - file path to processed json file (not including .json extension)
    """

    # If no filename provided then return.
    if json_filename == "":
        return

    with open(f"{json_filename}.json", "r") as f:
        api_data = json.load(f)
        observations = api_data["obs"]

        d = {}
        for record in observations:
            features_dict = {}
            features_dict["obs_value"] = record["obs_value"]["value"]
            for param in params:
                features_dict[param] = record[param]["value"]

            d[record["geography"][geography]] = features_dict

        if not out_file:
            out_file = f"{json_filename}_processed"

        with open(f"{out_file}.json", "w") as outfile:
            json.dump(d, outfile)


def main():
    process_json()


if __name__ == "__main__":
    main()
