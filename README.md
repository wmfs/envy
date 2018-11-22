# Envy
> Maintain environment variables centrally, and set them by current folder. Good for running tests from the command line.

## Install dependencies

```
npm install @wmfs/envy --global
```

## Or

```
npm install @wmfs/envy
npm link
```


## Environment variable

Now set the `ENVY_REPO_PATH` to point to a directory containing at least `path-to-value-map.json` and `value-store.json` files.

* This variable, for once, should be set at the system/user level so it's available at any point.
* By pointing `ENVY_REPO_PATH` to a directory in a separate private repo it will be possible to share environment variable values amongst a team.

## Running

Then from any directory:

```bash
envy
```

...will apply the environment variables applicable for that directory, as defined in a directory containing:

``` json
  path-to-value-map.json
  value-store.json
```

See tests.

# TODO:

* Use an `ENVY_CONFIG_PATH` environment variable to point to a suitable dir.
* Better error detection/handling
* Tests
* Support for a `local-overrides.json` file, that if present should superceed values in value-store.json.
* Add template support in values `"SOME_PATH": "${BLUEPRINT_PATH}/some-blueprint/"`... that way a "base" environment variable could be set in `value-store.json` (or even more powerfully... locally overridden).

# License

MIT
