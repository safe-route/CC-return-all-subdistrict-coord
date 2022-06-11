# Get Coordinates, Subdistrict Name, and Total Crime from Area Statistic

This function is meant to be deployed as a serverless function via GCP's cloud run. There is some issue with downloading file from GCS as the server can already take a request whilst the file is not yet downloaded thus returning **500** the possible workaround I implement is to pre-query the GCS file that is need to be downloaded in order to minimize the size that is need to bee downloaded, aleviating the problem. Need a proper fix in order to work with a larger (in this case) JSON file.

## Summary

Helper serverless function for Safe Route Android App. Acting as a query function from files hosted from GCS (in our case it is a `.json`). Using jsonata to query the JSON file, by first downloading the file to cloud functions intance `/tmp/` memory (in code it is referenced as `os.tempdir()`) because node doesn't have a library like `gcfs` in python, you can also try to read the file and write it to a buffer variable, but download is our preferable way.

## Reference

JSON query is done with [jsonata](https://jsonata.org/) by using its [simple and predicate queries as base](https://docs.jsonata.org/predicate). As we don't use any **GraphQL** based server we need to easily find a way to query over JSON request, responses, or file.

Asynch and await is used to make sure a promise has been returned before as to make sure the file has already been downloaded before you can do a request but this is faulty and we haven't found a proper fix for this issue.

Because of said problem in **summary** we deployed this functions as a container running an image that is built via [functions framework](https://www.npmjs.com/package/@google-cloud/functions-framework) and then building the actual image with [pack](https://buildpacks.io/docs/tools/pack/).

## Structure

There is no structure in this repository, you can put anything in the root and it will not affect image building or even running the function.

## Usage

Run the function locally with `npm install` (after copying the `package.json` if you are building from scratch but do not want to clone). then run `npm start` (start script is using functions-framework) see the functions framework in reference section for more details.

To build the image make see the section below

```bash
curl -X POST http://localhost:8080 -H "Content-Type:application/json"  -d '{"sub
district":"All"}'
```

to get

```bash
...
{"latitude":-6.243231,"longitude":106.8436975},{"latitude":-6.2431953,"longitude":106.843367},{"latitude":-6.2431469,"longitude":106.8429592},{"latitude":-6.2430653,"longitude":106.8425272},{"latitude":-6.2429319,"longitude":106.8418121},{"latitude":-6.2427776,"longitude":106.8411866},{"latitude":-6.2424452,"longitude":106.8399455},{"latitude":-6.2417947,"longitude":106.837787},{"latitude":-6.2413665,"longitude":106.8362533},{"latitude":-6.2410689,"longitude":106.8352331}
...
```

## Docker Support

run `build_image.sh` to build a docker file (make sure you have docker with pack tool installed). `build_image.sh` is using pack tool to build the functions (and because of such does not copy all of the files in root), below is the usage of pack tool to build the function image.

```bash
pack build \
  --builder gcr.io/buildpacks/builder:v1 \
  --env GOOGLE_FUNCTION_SIGNATURE_TYPE=http \
  --env GOOGLE_FUNCTION_TARGET=${function_target} \
  ${container_name}
```