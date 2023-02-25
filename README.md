# ngx-development-kit

### What is it?

ngx-development-kit is a library of tools designed to accelerate the development of Angular applications.

### Why might you need it?

Developing Angular applications often involves implementing common features like destroy services, memoization pipes,
and track-by-property directives.
The purpose of the ngx-development-kit library is collecting these tools in one place and makes them available as
ready-to-use utilities.
This can significantly reduce the time and effort required to develop applications.
Instead of copying and pasting solutions from one project to another, you can use the ngx-development-kit library to
quickly and easily integrate these features into your application.

## Table of Contents

* [Installation](#installation)
* [Features](#features)
  * [Pipes](#pipes)
    * [Call](#call)
  * [Services](#services)
    * [Destroy](#destroy)
* [License](#license)

## Installation

```bash
npm install ngx-development-kit --save
```

## Features

### Pipes

#### Call

###### Description

The `CallPipe` in Angular allows you to call a function with a specific input value and context.
By using this pipe, you can reduce the number of computations in your application by only executing the function when
there is a change to the input value or reference.
This can help to improve performance and make your code more flexible and reusable.

###### Usage

```ts
import { Component } from '@angular/core';
import { CallPipe } from 'ngx-development-kit'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CallPipe],
  template: `
    <div>{{ value | call : double }}</div>
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
import { CallPipe } from 'ngx-development-kit'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CallPipe],
  template: `
    <div>{{ value | call : raise : this }}</div>
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

#### Destroy

###### Description

The `DestroyService` is an Angular service that extends the `ReplaySubject` class
from [RxJS](https://rxjs.dev/api/index/class/ReplaySubject) and emits a value when a component is being destroyed. This
can be used to complete any observables that the component has created and prevent memory leaks.

###### Usage

```ts
import { Component, OnInit } from '@angular/core';
import { interval, takeUntil } from 'rxjs';
import { DestroyService } from 'ngx-development-kit';

@Component({
  selector: 'app-unknown',
  standalone: true,
  providers: [DestroyService],
  template: '',
})
export class UnknownComponent implements OnInit {
  constructor(private readonly destroy$: DestroyService) {
  }

  public ngOnInit(): void {
    interval(1_000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => console.log('tick'));
  }
}
```

> **NOTE**: When using the `DestroyService`, it is important to provide the service in an array of a component
> providers. This can be done by adding the `DestroyService` to the providers array in the `@Component` decorator for
> each
> component that uses it.
>
> `@Component({..., providers: [..., DestroyService]})`

## License

ngx-development-kit is released under
the [MIT License](https://github.com/lodygin/ngx-development-kit/blob/main/LICENSE).
