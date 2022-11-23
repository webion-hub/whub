interface ChronoObject {
  readonly getTime: () => number,
  readonly is: (coparator: Comparators) => ChronoComparator<any>,
}


type Comparators = "==" | "<=" | ">=" | "<" | ">" | "!="

interface ITimespan {
  readonly ms?: number,
  readonly seconds?: number,
  readonly minutes?: number,
  readonly hours?: number,
  readonly days?: number,
}

export class Timespan implements ChronoObject {
  public readonly timespan: ITimespan;

  constructor(timespan: ITimespan) {
    this.timespan = timespan;
  }

  getTime() {
    return (this.timespan.ms ?? 0)
      + (this.timespan.seconds ?? 0) * 1000
      + (this.timespan.minutes ?? 0) * 1000 * 60
      + (this.timespan.hours ?? 0) * 1000 * 60 * 60
      + (this.timespan.days ?? 0) * 1000 * 60 * 60 * 24
  }

  format() {
    const time = this.getTime()

    const totDays = time / (1000 * 60 * 60 * 24)
    const days = Math.floor(totDays)
    const restDays = totDays - days;

    const totHours = restDays * 24
    const hours = Math.floor(totHours)
    const restHours = totHours - hours

    const totMinutes = restHours * 60
    const minutes = Math.floor(totMinutes)
    const restMinutes = totMinutes - minutes

    const totSeconds = restMinutes * 60
    const seconds = Math.floor(totSeconds)
    const restSeconds = totSeconds - seconds

    const ms = restSeconds * 1000

    return new Timespan({
      days,
      hours,
      minutes,
      seconds,
      ms
    })
  }

  add(timespan: Timespan) {
    return new Timespan({
      ms: this.getTime() + timespan.getTime()
    })
  }

  sub(timespan: Timespan) {
    return new Timespan({
      ms: this.getTime() - timespan.getTime()
    })
  }

  is(coparator: Comparators) {
    return new ChronoComparator<Timespan>(this, coparator)
  }
}



class ChronoComparator<T extends ChronoObject> {
  private readonly value: T;
  private readonly comparator: Comparators;

  constructor(value: T, comparator: Comparators) {
    this.value = value;
    this.comparator = comparator;
  }

  then(value: T) {
    const t1 = Math.round(this.value.getTime())
    const t2 = Math.round(value.getTime())

    const action = {
      '==': () => t1 == t2,
      '!=': () => t1 != t2,
      '<': () => t1 < t2,
      '>': () => t1 > t2,
      '<=': () => t1 <= t2,
      '>=': () => t1 >= t2,
    }[this.comparator]

    return action()
  }
}


export class Chrono implements ChronoObject {
  private readonly ms: number;

  constructor(date: Date) {
    this.ms = date.getTime();
  }

  add(date: ChronoObject) {
    const newDate = new Date(
      this.ms + date.getTime()
    )

    return new Chrono(newDate)
  }

  sub(date: ChronoObject) {
    const newDate = new Date(
      this.ms - date.getTime()
    )

    return new Chrono(newDate)
  }

  getTime() {
    return this.ms
  };

  is(coparator: Comparators) {
    return new ChronoComparator<Chrono>(this, coparator)
  }
}



const t = new Timespan({
  ms: 123,
  hours: 1,
  days: 3
})

const t2 = t.add(new Timespan({
    days: 10,
  }))
  .sub(new Timespan({
    days: 4
  }))


console.log(
  t
    .is('>')
    .then(t2)
)


