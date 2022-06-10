# Get Coordinates from Area Statistic

Return all of the coordinates from area statistic without choosing the area. run `npm start` to test the function locally and the do.

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