# Game of Life

## Building
The application can be built via Maven with `mvn clean install` command.
The backend supports loading `.lif` Game of Life pattern files from a specific folder.
This folder can be set in `src/main/resources/application.properties` file.
## Example:
`gameoflife.upload.pattern-path=C:/Workspace/game-of-life/lifs`

## Running
Maven packages the application in a `.jar` file which can be found in `/target` folder.
After running this jar file the application can be accessed via `localhost:8080` in a browser.

## Functionalities
- Loading of `.lif` patterns.
- Auto playing next generation.
- Stepping to next generation manually.
- Generation counter.
