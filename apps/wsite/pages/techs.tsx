import { Img, NextImg, Page, Section, Sections, useLanguage } from '@whub/wui';
import { CardGroup } from '../components/CardGroup';
import { IconCard } from '../components/IconCard';
import { GetAQuoteSection } from '../components/sections/GetAQuote';

type DateTypes = Date | number | ITimeSpan
type ToMs = () => number;
type ToDate = () => Date;
type DateOperation = <T extends DateTypes>(date: T) => ITimeSpan;

abstract class ITimeSpan {
  public abstract readonly add: DateOperation;
  public abstract readonly sub: DateOperation;
  public abstract readonly toMs: ToMs;
  public abstract readonly toDate: ToDate;

  protected static isDate = <T extends DateTypes>(val: T) => {
    return !!(val as Date)?.getMonth
  }

  protected static isMs = <T extends DateTypes>(val: T) => {
    return typeof val === 'number'
  }

  protected static isTimeSpan = <T extends DateTypes>(val: T) => {
    return !!(val as ITimeSpan).toMs
  }

  protected static getType = <T extends DateTypes>(val: T) => {
    if(this.isDate(val))
      return 'date'

    if(this.isMs(val))
      return 'ms'

    if(this.isTimeSpan(val))
      return 'timespan'

    return 'unknow'
  }

  protected static getMs = <T extends DateTypes>(val: T) => {
    return {
      "date": () => (val as Date).getTime(),
      "ms": () => val,
      "timespan": () => (val as ITimeSpan).toMs()
    }[this.getType(val)]?.()
  }
}


class TimeSpan<T extends DateTypes> extends ITimeSpan {
  static readonly SECOND = new TimeSpan(1000)
  static readonly MIN = new TimeSpan( this.SECOND.toMs() * 60 )
  static readonly HOUR = new TimeSpan( this.MIN.toMs() * 60 )
  static readonly DAY = new TimeSpan( this.HOUR.toMs() * 24 )

  private ms = 0;

  constructor(date: T) {
    super()

    this.ms = ITimeSpan.getMs(date)
  }

  static getSeconds = (seconds: number) => {
    return new TimeSpan( TimeSpan.SECOND.toMs() * seconds )
  }

  static getMins = (mins: number) => {
    return new TimeSpan( TimeSpan.MIN.toMs() * mins )
  }

  static getHours = (mins: number) => {
    return new TimeSpan( TimeSpan.MIN.toMs() * mins )
  }

  static getDays = (days: number) => {
    return new TimeSpan( TimeSpan.DAY.toMs() * days )
  }

  toDate = () => {
    return new Date(this.ms)
  };

  toMs = () => {
    return this.ms
  };

  add = <T extends DateTypes,>(date: T) => {
    const dateMs = ITimeSpan.getMs(date)

    return new TimeSpan(
      this.toMs() +
      dateMs
    )
  }

  sub = <T extends DateTypes,>(date: T) => {
    const dateMs = ITimeSpan.getMs(date)

    return new TimeSpan(
      this.toMs() -
      dateMs
    )
  }
}



export default function Techs() {
  const { t } = useLanguage();

  const d = DateTime.Now;
  const d2 = d
    .sub(t`10s`)
    .add(t`10m`)

  const a = new TimeSpan(new Date())
    .sub(new Date(0))
    .add(new TimeSpan(1000))


  console.log(a.toMs())

  return (
    <Page>
      <Sections>
        <Section>
          <CardGroup label={t('technologies')} title={t('technologies-title')}>
            <IconCard
              icon={
                <NextImg
                  auto
                  width="100%"
                  alt="c-sharp"
                  src="/assets/images/technologies/c-sharp.svg"
                  sx={{ padding: 1.5 }}
                />
              }
              iconBackgroundColor="#fff"
              title="C#"
              paragraph={t('c#')}
            />
            <IconCard
              icon={
                <NextImg
                  auto
                  width="100%"
                  alt="angular"
                  src="/assets/images/technologies/angular.svg"
                  sx={{ padding: 1.5 }}
                />
              }
              iconBackgroundColor="#fff"
              title="Angular"
              paragraph={t('angular')}
            />
            <IconCard
              icon={
                <NextImg
                  auto
                  width="100%"
                  alt="flutter"
                  src="/assets/images/technologies/flutter.svg"
                  sx={{ padding: 1.5 }}
                />
              }
              iconBackgroundColor="#fff"
              title="Flutter"
              paragraph={t('flutter')}
            />
            <IconCard
              icon={
                <NextImg
                  auto
                  width="100%"
                  alt="docker"
                  src="/assets/images/technologies/docker.svg"
                  sx={{ padding: 1.5 }}
                />
              }
              iconBackgroundColor="#fff"
              title="Docker"
              paragraph={t('docker')}
            />
            <IconCard
              icon={
                <NextImg
                  auto
                  width="100%"
                  alt="react"
                  src="/assets/images/technologies/react.svg"
                  sx={{ padding: 1.5 }}
                />
              }
              iconBackgroundColor="#fff"
              title="React"
              paragraph={t('react')}
            />
            <IconCard
              icon={
                <NextImg
                  auto
                  width="100%"
                  alt="net-core"
                  src="/assets/images/technologies/net-core.svg"
                  sx={{ padding: 1.5 }}
                />
              }
              iconBackgroundColor="#fff"
              title="NET Core"
              paragraph={t('net-core')}
            />
          </CardGroup>
        </Section>
        <GetAQuoteSection />
      </Sections>
    </Page>
  );
}
