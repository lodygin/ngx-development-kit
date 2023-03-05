# ngx-development-kit

### What is it?

ngx-development-kit is a library of tools designed to accelerate the development of Angular applications.

### Why might you need it?

Developing Angular applications often involves implementing common features like destroy services, memoization pipes, and track-by-property directives.
The purpose of the ngx-development-kit library is collecting these tools in one place and makes them available as ready-to-use utilities.
This can significantly reduce the time and effort required to develop applications.
Instead of copying and pasting solutions from one project to another, you can use the ngx-development-kit library to quickly and easily integrate these features into your application.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
  - [Pipes](#pipes)
    - [NgxCall](#ngxcall)
  - [Services](#services)
    - [NgxDestroy](#ngxdestroy)
  - [Directives](#directives)
    - [NgxLet](#ngxlet)
    - [NgxTrackBy](#ngxtrackby)
    - [NgxEmpty](#ngxempty)
  - [Modules](#modules)
    - [NgxFor](#ngxfor)
- [License](#license)

## Installation

```shell
npm install ngx-development-kit --save
```

## Features

### Pipes

#### NgxCall

##### Description

The `NgxCallPipe` in Angular allows you to call a function with a specific input value and context.
By using this pipe, you can reduce the number of computations in your application by only executing the function when there is a change to the input value or reference.
This can help to improve performance and make your code more flexible and reusable.

##### Usage

```ts
import { Component } from '@angular/core';
import { NgxCallPipe } from 'ngx-development-kit';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxCallPipe],
  template: `
    <div>{{ value | ngxCall : double }}</div>
  `,
})
export class AppComponent {
  public double(value: number): number {
    return value * 2;
  }
}
```

With context:

```ts
import { Component } from '@angular/core';
import { NgxCallPipe } from 'ngx-development-kit';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxCallPipe],
  template: `
    <div>{{ value | ngxCall : raise : this }}</div>
  `,
})
export class AppComponent {
  private power = 5;

  public raise(value: number): number {
    return value * this.power;
  }
}
```

> **NOTE**: Avoid using `.bind(this)`. It causes the method to be called during every change detection cycle.

### Services

#### NgxDestroy

##### Description

The `NgxDestroyService` is an Angular service that extends the `ReplaySubject` class from [RxJS](https://rxjs.dev/api/index/class/ReplaySubject) and emits a value when a component is being destroyed.
This can be used to complete any observables that the component has created and prevent memory leaks.

##### Usage

```ts
import { Component, OnInit } from '@angular/core';
import { interval, takeUntil } from 'rxjs';
import { NgxDestroyService } from 'ngx-development-kit';

@Component({
  selector: 'app-unknown',
  standalone: true,
  providers: [NgxDestroyService],
  template: '',
})
export class UnknownComponent implements OnInit {
  constructor(private readonly destroy$: NgxDestroyService) {
  }

  public ngOnInit(): void {
    interval(1_000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => console.log('tick'));
  }
}
```

> **NOTE**: When using the `NgxDestroyService`, it is important to provide the service in an array of a component providers. 
> This can be done by adding the `NgxDestroyService` to the providers array in the `@Component` decorator for each component that uses it.
>
> `@Component({..., providers: [..., NgxDestroyService]})`

### Directives

#### NgxLet

##### Description

The `NgxLetDirective` is an Angular directive that simplifies template binding by accessing to the value of a given input variable. 
It's particularly useful when working with data using the `AsyncPipe`. The directive defines a class called `NgxLetContext`, which provides access to the value of the `*ngxLet` input variable within the template.

##### Usage

```ts
import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { of } from 'rxjs';
import { NgxLetDirective } from 'ngx-development-kit';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxLetDirective, AsyncPipe],
  template: `
    <div *ngxLet="user$ | async as user">
      {{ user!.firstName }} {{ user!.lastName }}
    </div>
  `,
})
export class AppComponent {
  public user$ = of({
    firstName: 'alexander',
    lastName: 'lodygin',
  });
}
```

or:

```ts
import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { of } from 'rxjs';
import { NgxLetDirective } from 'ngx-development-kit';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxLetDirective, AsyncPipe],
  template: `
    <div *ngxLet="user$ | async; let user">
      {{ user!.firstName }} {{ user!.lastName }}
    </div>
  `,
})
export class AppComponent {
  public user$ = of({
    firstName: 'alexander',
    lastName: 'lodygin',
  });
}
```

A use case with `ng-template`:

```ts
import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { of } from 'rxjs';
import { NgxLetDirective } from 'ngx-development-kit';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxLetDirective, AsyncPipe],
  template: `
    <ng-template [ngxLet]="user$ | async" let-user>
      {{ user!.firstName }} {{ user!.lastName }}
    </ng-template>
  `,
})
export class AppComponent {
  public user$ = of({
    firstName: 'alexander',
    lastName: 'lodygin',
  });
}
```

> **NOTE**: When using the `NgxLetDirective`, especially with [strict](https://www.typescriptlang.org/tsconfig#strict) type checking, it's important to remember to use the non-null assertion operator (`!.`) or optional chaining operator (`?.`) when working with the `AsyncPipe` and objects.
> This helps to avoid errors related to null or undefined values.

#### NgxTrackBy

##### Description

This is an Angular directive called `NgxTrackByDirective` that enhances the `NgForOf` directive from the [@angular/common](https://www.npmjs.com/package/@angular/common) library.
The purpose of this directive is to provide a custom `trackBy` function to the `NgForOf` directive.
The `trackBy` function is used to improve the performance of the `NgForOf` directive by identifying which items have changed in the iterable.

##### Usage

```ts
import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { NgxTrackByDirective } from 'ngx-development-kit';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgForOf, NgxTrackByDirective],
  template: `
    <ul *ngFor="let user of users; ngxTrackBy 'id'">
      <li>{{ user.name }}</li>
    </ul>
  `,
})
export class AppComponent {
  public users = [
    { id: '1', name: 'David' },
    { id: '2', name: 'Mark' },
    { id: '3', name: 'Bennett' },
    { id: '4', name: 'Oliver' },
  ];
}
```

#### NgxEmpty

##### Description

This is an Angular directive called `NgxEmptyDirective` which is used to display a template when an `NgFor` loop has no data to render.

##### Usage

Only the paragraph with the text "No Data" will be shown:

```ts
import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { Observable, of } from 'rxjs';
import { NgxEmptyDirective } from 'ngx-development-kit';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgForOf, NgxEmptyDirective],
  template: `
      <ng-container *ngFor="let user of (users$ | async)!; ngxEmpty emptyRef">
        <p>{{ user.name }}</p>
      </ng-container>

      <ng-template #emptyRef>
        <p>No data</p>
      </ng-template>
  `,
})
export class AppComponent {
  public users$ = of<Record<'id' | 'name', string>[]>([]);
}
```

### Modules

#### NgxFor

##### Description

Module exports:

- [NgxTrackBy](#ngxtrackby)
- [NgxEmpty](#ngxempty)

## License

ngx-development-kit is released under the [MIT License](https://github.com/lodygin/ngx-development-kit/blob/main/LICENSE).
