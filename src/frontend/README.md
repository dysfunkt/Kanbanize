# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## How to run
Navigate to ./src/api and run `nodemon app.js` to start mongodb server.
Navigate to ./src/frontend and run `ng serve` then go to the localhost link. Any changes made there will auto update. 

## Git
Main branch will be locked from being pushed. All changes are to be made in your own branch and merged via pull requests.
To create a new branch:
```
git checkout -b <branch-name>
```

To save your work to your branch locally:
```
git add <file-name OR folder-name>
OR
git add . (to commit whole directory)
THEN
git commit -m "COMMENT TO DESCRIBE THE INTENTION OF THE COMMIT"
```

After committing locally, to push to remote repository:
```
git push origin <branch-name>
```

## Merging and pull requests
To merge the main branch, first push your branch. Then create a pull request by clicking "Compare & pull request" and contact Willy and Samuel after.
